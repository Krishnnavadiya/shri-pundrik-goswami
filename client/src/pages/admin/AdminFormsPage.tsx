import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Trash2, Mail, Phone, ChevronRight, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { adminApi } from '@/services/adminApi';
import { extractErrorMessage } from '@/services/api';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { Loader } from '@/components/common/Loader';
import { Modal } from '@/components/admin/Modal';
import { formatDateTime } from '@/utils/format';
import { cn } from '@/utils/cn';
import type {
  ContactSubmission,
  KathaProgramType,
  KathaRequest,
  KathaRequestStatus,
  Registration,
} from '@/types';

type Tab = 'contact' | 'registrations' | 'katha';

const formStatuses: Array<'new' | 'reviewed' | 'contacted' | 'closed'> = [
  'new',
  'reviewed',
  'contacted',
  'closed',
];

const kathaStatuses: KathaRequestStatus[] = [
  'New',
  'Contacted',
  'Confirmed',
  'Rejected',
  'Completed',
];

const programTypes: KathaProgramType[] = [
  'Katha',
  'Pravachan',
  'Sankirtan',
  'Spiritual Gathering',
  'Online Session',
  'Other',
];

const AdminFormsPage = (): JSX.Element => {
  const qc = useQueryClient();
  const [tab, setTab] = useState<Tab>('contact');
  const [filter, setFilter] = useState<string | undefined>();
  const [programFilter, setProgramFilter] = useState<string | undefined>();
  const [search, setSearch] = useState('');
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);
  const [selectedKatha, setSelectedKatha] = useState<KathaRequest | null>(null);

  const contacts = useQuery({
    queryKey: ['admin', 'contacts', filter],
    queryFn: () => adminApi.listContactSubmissions(filter ? { status: filter } : {}),
    enabled: tab === 'contact',
  });

  const regs = useQuery({
    queryKey: ['admin', 'regs', filter],
    queryFn: () => adminApi.listRegistrations(filter ? { status: filter } : {}),
    enabled: tab === 'registrations',
  });

  const kathaRequests = useQuery({
    queryKey: ['admin', 'katha', filter, programFilter, search],
    queryFn: () =>
      adminApi.listKathaRequests({
        ...(filter ? { status: filter } : {}),
        ...(programFilter ? { programType: programFilter } : {}),
        ...(search.trim() ? { search: search.trim() } : {}),
      }),
    enabled: tab === 'katha',
  });

  const updateContactStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      adminApi.updateContactStatus(id, status),
    onSuccess: () => {
      toast.success('Status updated');
      qc.invalidateQueries({ queryKey: ['admin', 'contacts'] });
      setSelectedContact(null);
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });

  const updateRegStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      adminApi.updateRegistrationStatus(id, status),
    onSuccess: () => {
      toast.success('Status updated');
      qc.invalidateQueries({ queryKey: ['admin', 'regs'] });
      setSelectedReg(null);
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });

  const updateKathaStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: KathaRequestStatus }) =>
      adminApi.updateKathaRequestStatus(id, status),
    onSuccess: () => {
      toast.success('Status updated');
      qc.invalidateQueries({ queryKey: ['admin', 'katha'] });
      qc.invalidateQueries({ queryKey: ['admin', 'stats'] });
      setSelectedKatha(null);
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });

  const delContact = useMutation({
    mutationFn: (id: string) => adminApi.deleteContactSubmission(id),
    onSuccess: () => {
      toast.success('Deleted');
      qc.invalidateQueries({ queryKey: ['admin', 'contacts'] });
      setSelectedContact(null);
    },
  });

  const delReg = useMutation({
    mutationFn: (id: string) => adminApi.deleteRegistration(id),
    onSuccess: () => {
      toast.success('Deleted');
      qc.invalidateQueries({ queryKey: ['admin', 'regs'] });
      setSelectedReg(null);
    },
  });

  const delKatha = useMutation({
    mutationFn: (id: string) => adminApi.deleteKathaRequest(id),
    onSuccess: () => {
      toast.success('Deleted');
      qc.invalidateQueries({ queryKey: ['admin', 'katha'] });
      qc.invalidateQueries({ queryKey: ['admin', 'stats'] });
      setSelectedKatha(null);
    },
  });

  const resetFilters = (nextTab: Tab): void => {
    setTab(nextTab);
    setFilter(undefined);
    setProgramFilter(undefined);
    setSearch('');
  };

  return (
    <div>
      <AdminPageHeader
        title="Form Submissions"
        subtitle="Review contact inquiries, program registrations, and Katha requests."
      />

      <div className="flex flex-wrap items-center gap-3 mb-4">
        {(
          [
            ['contact', 'Contact Inquiries'],
            ['registrations', 'Registrations'],
            ['katha', 'Katha Requests'],
          ] as const
        ).map(([t, label]) => (
          <button
            key={t}
            onClick={() => resetFilters(t)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium border transition-colors',
              tab === t
                ? 'bg-saffron-700 text-white border-saffron-700'
                : 'bg-white text-stone-700 border-stone-300 hover:bg-cream-100',
            )}
          >
            {label}
          </button>
        ))}

        <div className="ml-auto flex flex-wrap items-center gap-2">
          {tab === 'katha' && (
            <>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  className="input pl-9 max-w-[200px]"
                  placeholder="Search name, city..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <select
                className="input max-w-[160px]"
                value={programFilter || ''}
                onChange={(e) => setProgramFilter(e.target.value || undefined)}
              >
                <option value="">All programs</option>
                {programTypes.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </>
          )}
          <span className="text-xs text-stone-500">Status:</span>
          <select
            className="input max-w-[180px]"
            value={filter || ''}
            onChange={(e) => setFilter(e.target.value || undefined)}
          >
            <option value="">All</option>
            {(tab === 'katha' ? kathaStatuses : formStatuses).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-stone-200 overflow-hidden overflow-x-auto">
        {tab === 'contact' ? (
          contacts.isLoading ? (
            <Loader />
          ) : !contacts.data || contacts.data.data.length === 0 ? (
            <p className="p-10 text-center text-stone-500 text-sm">No contact inquiries.</p>
          ) : (
            <table className="w-full text-sm min-w-[640px]">
              <thead className="bg-stone-50 text-stone-600 text-xs uppercase tracking-widest">
                <tr>
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Contact</th>
                  <th className="text-left p-3">Subject</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Submitted</th>
                  <th className="text-right p-3">Open</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {contacts.data.data.map((c) => (
                  <tr
                    key={c._id}
                    className="hover:bg-stone-50 cursor-pointer"
                    onClick={() => setSelectedContact(c)}
                  >
                    <td className="p-3 font-medium text-stone-800">{c.name}</td>
                    <td className="p-3 text-stone-600">
                      <div className="flex items-center gap-2 text-xs">
                        <Mail className="w-3 h-3" /> {c.email}
                      </div>
                      {c.phone && (
                        <div className="flex items-center gap-2 text-xs mt-1">
                          <Phone className="w-3 h-3" /> {c.phone}
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-stone-600">{c.subject || '—'}</td>
                    <td className="p-3">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="p-3 text-stone-600 text-xs">{formatDateTime(c.createdAt)}</td>
                    <td className="p-3 text-right">
                      <ChevronRight className="w-4 h-4 text-stone-400 inline" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : tab === 'registrations' ? (
          regs.isLoading ? (
            <Loader />
          ) : !regs.data || regs.data.data.length === 0 ? (
            <p className="p-10 text-center text-stone-500 text-sm">No registrations.</p>
          ) : (
            <table className="w-full text-sm min-w-[640px]">
              <thead className="bg-stone-50 text-stone-600 text-xs uppercase tracking-widest">
                <tr>
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Program</th>
                  <th className="text-left p-3">Contact</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Submitted</th>
                  <th className="text-right p-3">Open</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {regs.data.data.map((r) => (
                  <tr
                    key={r._id}
                    className="hover:bg-stone-50 cursor-pointer"
                    onClick={() => setSelectedReg(r)}
                  >
                    <td className="p-3 font-medium text-stone-800">{r.name}</td>
                    <td className="p-3 text-stone-600">{r.programTitle || '—'}</td>
                    <td className="p-3 text-stone-600">
                      <div className="text-xs">{r.email}</div>
                      {r.phone && <div className="text-xs">{r.phone}</div>}
                    </td>
                    <td className="p-3">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="p-3 text-stone-600 text-xs">{formatDateTime(r.createdAt)}</td>
                    <td className="p-3 text-right">
                      <ChevronRight className="w-4 h-4 text-stone-400 inline" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : kathaRequests.isLoading ? (
          <Loader />
        ) : !kathaRequests.data || kathaRequests.data.data.length === 0 ? (
          <p className="p-10 text-center text-stone-500 text-sm">No Katha requests.</p>
        ) : (
          <table className="w-full text-sm min-w-[720px]">
            <thead className="bg-stone-50 text-stone-600 text-xs uppercase tracking-widest">
              <tr>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">City</th>
                <th className="text-left p-3">Program</th>
                <th className="text-left p-3">Preferred Date</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Submitted</th>
                <th className="text-right p-3">Open</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {kathaRequests.data.data.map((k) => (
                <tr
                  key={k._id}
                  className="hover:bg-stone-50 cursor-pointer"
                  onClick={() => setSelectedKatha(k)}
                >
                  <td className="p-3 font-medium text-stone-800">{k.fullName}</td>
                  <td className="p-3 text-stone-600">
                    {k.city}, {k.country}
                  </td>
                  <td className="p-3 text-stone-600">{k.programType}</td>
                  <td className="p-3 text-stone-600 text-xs">
                    {formatDateTime(k.preferredDate)}
                  </td>
                  <td className="p-3">
                    <StatusBadge status={k.status} />
                  </td>
                  <td className="p-3 text-stone-600 text-xs">{formatDateTime(k.createdAt)}</td>
                  <td className="p-3 text-right">
                    <ChevronRight className="w-4 h-4 text-stone-400 inline" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Contact modal */}
      <Modal
        open={!!selectedContact}
        onClose={() => setSelectedContact(null)}
        title="Contact Inquiry"
      >
        {selectedContact && (
          <div className="space-y-3 text-sm">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-stone-500 uppercase tracking-widest">Name</p>
                <p className="font-medium">{selectedContact.name}</p>
              </div>
              <div>
                <p className="text-xs text-stone-500 uppercase tracking-widest">Submitted</p>
                <p>{formatDateTime(selectedContact.createdAt)}</p>
              </div>
              <div>
                <p className="text-xs text-stone-500 uppercase tracking-widest">Email</p>
                <a href={`mailto:${selectedContact.email}`} className="text-saffron-700">
                  {selectedContact.email}
                </a>
              </div>
              <div>
                <p className="text-xs text-stone-500 uppercase tracking-widest">Phone</p>
                <p>{selectedContact.phone || '—'}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-stone-500 uppercase tracking-widest">Subject</p>
                <p>{selectedContact.subject || '—'}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-stone-500 uppercase tracking-widest mb-1">Message</p>
              <p className="whitespace-pre-line bg-stone-50 p-3 rounded">{selectedContact.message}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-stone-100">
              <span className="text-xs text-stone-500">Mark as:</span>
              {formStatuses.map((s) => (
                <button
                  key={s}
                  onClick={() =>
                    updateContactStatus.mutate({ id: selectedContact._id, status: s })
                  }
                  className={cn(
                    'px-3 py-1 text-xs rounded-full border',
                    selectedContact.status === s
                      ? 'bg-saffron-700 text-white border-saffron-700'
                      : 'bg-white text-stone-700 border-stone-300 hover:bg-cream-100',
                  )}
                >
                  {s}
                </button>
              ))}
              <button
                onClick={() =>
                  confirm('Delete this submission?') && delContact.mutate(selectedContact._id)
                }
                className="ml-auto inline-flex items-center gap-1 text-maroon-700 text-xs"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Registration modal */}
      <Modal open={!!selectedReg} onClose={() => setSelectedReg(null)} title="Registration">
        {selectedReg && (
          <div className="space-y-3 text-sm">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-stone-500 uppercase tracking-widest">Name</p>
                <p className="font-medium">{selectedReg.name}</p>
              </div>
              <div>
                <p className="text-xs text-stone-500 uppercase tracking-widest">Program</p>
                <p>{selectedReg.programTitle || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-stone-500 uppercase tracking-widest">Email</p>
                <a href={`mailto:${selectedReg.email}`} className="text-saffron-700">
                  {selectedReg.email}
                </a>
              </div>
              <div>
                <p className="text-xs text-stone-500 uppercase tracking-widest">Phone</p>
                <p>{selectedReg.phone || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-stone-500 uppercase tracking-widest">Date of birth</p>
                <p>{selectedReg.dob ? formatDateTime(selectedReg.dob) : '—'}</p>
              </div>
              <div>
                <p className="text-xs text-stone-500 uppercase tracking-widest">Submitted</p>
                <p>{formatDateTime(selectedReg.createdAt)}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-stone-500 uppercase tracking-widest">Address</p>
                <p>{selectedReg.address || '—'}</p>
              </div>
            </div>
            {selectedReg.message && (
              <div>
                <p className="text-xs text-stone-500 uppercase tracking-widest mb-1">Message</p>
                <p className="whitespace-pre-line bg-stone-50 p-3 rounded">{selectedReg.message}</p>
              </div>
            )}
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-stone-100">
              <span className="text-xs text-stone-500">Mark as:</span>
              {formStatuses.map((s) => (
                <button
                  key={s}
                  onClick={() => updateRegStatus.mutate({ id: selectedReg._id, status: s })}
                  className={cn(
                    'px-3 py-1 text-xs rounded-full border',
                    selectedReg.status === s
                      ? 'bg-saffron-700 text-white border-saffron-700'
                      : 'bg-white text-stone-700 border-stone-300 hover:bg-cream-100',
                  )}
                >
                  {s}
                </button>
              ))}
              <button
                onClick={() => confirm('Delete this registration?') && delReg.mutate(selectedReg._id)}
                className="ml-auto inline-flex items-center gap-1 text-maroon-700 text-xs"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Katha request modal */}
      <Modal open={!!selectedKatha} onClose={() => setSelectedKatha(null)} title="Katha Request">
        {selectedKatha && (
          <div className="space-y-3 text-sm">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-stone-500 uppercase tracking-widest">Full Name</p>
                <p className="font-medium">{selectedKatha.fullName}</p>
              </div>
              <div>
                <p className="text-xs text-stone-500 uppercase tracking-widest">Program Type</p>
                <p>{selectedKatha.programType}</p>
              </div>
              <div>
                <p className="text-xs text-stone-500 uppercase tracking-widest">Phone</p>
                <p>{selectedKatha.phoneNumber}</p>
              </div>
              <div>
                <p className="text-xs text-stone-500 uppercase tracking-widest">WhatsApp</p>
                <p>{selectedKatha.whatsappNumber || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-stone-500 uppercase tracking-widest">Email</p>
                <p>{selectedKatha.email || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-stone-500 uppercase tracking-widest">Organization</p>
                <p>{selectedKatha.organizationName || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-stone-500 uppercase tracking-widest">City / Country</p>
                <p>
                  {selectedKatha.city}, {selectedKatha.country}
                </p>
              </div>
              <div>
                <p className="text-xs text-stone-500 uppercase tracking-widest">Attendees</p>
                <p>{selectedKatha.expectedAttendees ?? '—'}</p>
              </div>
              <div>
                <p className="text-xs text-stone-500 uppercase tracking-widest">Preferred Date</p>
                <p>{formatDateTime(selectedKatha.preferredDate)}</p>
              </div>
              <div>
                <p className="text-xs text-stone-500 uppercase tracking-widest">Alternate Date</p>
                <p>
                  {selectedKatha.alternateDate
                    ? formatDateTime(selectedKatha.alternateDate)
                    : '—'}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-stone-500 uppercase tracking-widest">Venue Address</p>
                <p className="whitespace-pre-line">{selectedKatha.venueAddress}</p>
              </div>
            </div>
            {selectedKatha.message && (
              <div>
                <p className="text-xs text-stone-500 uppercase tracking-widest mb-1">Message</p>
                <p className="whitespace-pre-line bg-stone-50 p-3 rounded">{selectedKatha.message}</p>
              </div>
            )}
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-stone-100">
              <span className="text-xs text-stone-500">Mark as:</span>
              {kathaStatuses.map((s) => (
                <button
                  key={s}
                  onClick={() =>
                    updateKathaStatus.mutate({ id: selectedKatha._id, status: s })
                  }
                  className={cn(
                    'px-3 py-1 text-xs rounded-full border',
                    selectedKatha.status === s
                      ? 'bg-saffron-700 text-white border-saffron-700'
                      : 'bg-white text-stone-700 border-stone-300 hover:bg-cream-100',
                  )}
                >
                  {s}
                </button>
              ))}
              <button
                onClick={() =>
                  confirm('Delete this Katha request?') && delKatha.mutate(selectedKatha._id)
                }
                className="ml-auto inline-flex items-center gap-1 text-maroon-700 text-xs"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminFormsPage;
