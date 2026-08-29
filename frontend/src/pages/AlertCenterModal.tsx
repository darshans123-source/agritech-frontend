import React, { useState } from 'react';
import {
  Bell,
  X,
  CheckCircle2,
  AlertTriangle,
  Info,
  Clock,
  ExternalLink,
  Filter,
  CheckCheck
} from 'lucide-react';
import { useFarmData } from '../context/FarmDataContext';
import { useLanguage } from '../context/LanguageContext';

interface AlertCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tabId: string) => void;
}

export const AlertCenterModal: React.FC<AlertCenterModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useFarmData();
  const { t } = useLanguage();

  const [priorityFilter, setPriorityFilter] = useState<'All' | 'Critical' | 'Important' | 'Normal'>('All');

  if (!isOpen) return null;

  const filteredNotifs = notifications.filter((n) =>
    priorityFilter === 'All' ? true : n.priority === priorityFilter
  );

  const handleActionClick = (notif: any) => {
    markNotificationAsRead(notif.id);
    if (notif.actionRoute) {
      onNavigate(notif.actionRoute);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Bell className="w-5 h-5 text-emerald-600" />
            <div>
              <h3 className="font-extrabold text-base text-slate-900 font-heading">
                {t('notifications')}
              </h3>
              <p className="text-xs text-slate-400">
                {notifications.filter((n) => !n.read).length} unread alerts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={markAllNotificationsAsRead}
              className="text-xs text-emerald-700 font-bold hover:underline flex items-center gap-1"
              title="Mark all as read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark read</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Priority Filter Pills */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-100 flex gap-1.5 overflow-x-auto">
          {(['All', 'Critical', 'Important', 'Normal'] as const).map((prio) => (
            <button
              key={prio}
              onClick={() => setPriorityFilter(prio)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all shrink-0 ${
                priorityFilter === prio
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {prio}
            </button>
          ))}
        </div>

        {/* Alerts List */}
        <div className="flex-1 p-5 overflow-y-auto space-y-3.5">
          {filteredNotifs.length === 0 ? (
            <div className="text-center py-16 space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <div className="font-bold text-slate-800 text-sm">All clear! No alerts</div>
              <p className="text-xs text-slate-400">
                You are up to date on weather, disease, and mandi price alerts.
              </p>
            </div>
          ) : (
            filteredNotifs.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markNotificationAsRead(notif.id)}
                className={`p-4 rounded-2xl border transition-all space-y-2.5 ${
                  notif.read
                    ? 'bg-slate-50/70 border-slate-200 opacity-70'
                    : 'bg-white border-slate-200 shadow-2xs hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        notif.priority === 'Critical'
                          ? 'bg-rose-500 animate-ping'
                          : notif.priority === 'Important'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                    />
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {notif.category}
                    </span>
                  </div>

                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{notif.timestamp}</span>
                  </span>
                </div>

                <div className="font-bold text-xs text-slate-900">{notif.title}</div>
                <p className="text-xs text-slate-600 leading-relaxed">{notif.message}</p>

                {notif.actionRoute && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleActionClick(notif);
                    }}
                    className="pt-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    <span>View & Take Action</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
