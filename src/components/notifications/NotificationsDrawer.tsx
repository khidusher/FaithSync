import React from 'react';
import { X, CheckCheck, Heart, Flame, Sparkles, Bell } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';
import { AppNotification } from '../../types';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose
}) => {
  const { notifications, markNotificationsRead } = useApp();

  if (!isOpen) return null;

  const renderIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'encouragement':
        return <Heart className="w-4 h-4 text-[#A67C52] fill-[#A67C52]" />;
      case 'friend_completion':
        return <Flame className="w-4 h-4 text-[#66805C] fill-[#66805C]" />;
      case 'daily_reminder':
        return <Sparkles className="w-4 h-4 text-[#D4A94D]" />;
      default:
        return <Bell className="w-4 h-4 text-[#6B4F2A]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end font-sans">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-sm bg-[#F7F1E5] text-[#2D2924] h-full shadow-2xl flex flex-col z-10 border-l border-[#E6DCCB]">
        {/* Header */}
        <div className="p-4 border-b border-[#E6DCCB] flex items-center justify-between bg-[#FFFDF8]">
          <div>
            <h2 className="font-serif text-lg font-bold text-[#2D2924]">Notifications</h2>
            <p className="text-xs text-[#766F67]">
              Uplifting community updates &amp; activity
            </p>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={markNotificationsRead}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-xs font-bold text-[#6B4F2A] hover:underline"
              title="Mark all as read"
            >
              <CheckCheck className="w-4 h-4 mr-1" />
              Read
            </button>
            <button
              onClick={onClose}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-[#E6DCCB]/40 text-[#766F67]"
            >
              <X className="w-5 h-5 text-[#6B4F2A]" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="py-16 text-center text-[#766F67]">
              <Bell className="w-10 h-10 mx-auto text-[#E6DCCB] mb-2" />
              <p className="font-serif font-bold text-base text-[#2D2924]">All caught up</p>
              <p className="text-xs mt-1">Peaceful moments ahead.</p>
            </div>
          ) : (
            notifications.map(notif => (
              <div
                key={notif.id}
                className={`p-3.5 rounded-2xl transition-all border ${
                  notif.isRead
                    ? 'bg-[#FFFDF8]/70 border-[#E6DCCB]'
                    : 'bg-[#FFFDF8] border-[#D4A94D]/60 shadow-2xs'
                }`}
              >
                <div className="flex items-start gap-3">
                  {notif.senderAvatar ? (
                    <Avatar
                      src={notif.senderAvatar}
                      name={notif.senderName || 'Friend'}
                      size="sm"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#F7F1E5] border border-[#E6DCCB] flex items-center justify-center">
                      {renderIcon(notif.type)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-[#2D2924] truncate">
                        {notif.title}
                      </h4>
                      {!notif.isRead && (
                        <span className="w-2 h-2 rounded-full bg-[#D4A94D] shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-[#766F67] mt-0.5 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
