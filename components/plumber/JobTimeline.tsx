interface TimelineEvent {
  id: string;
  eventType: string;
  notes: string | null;
  createdAt: string;
  plumber?: { name: string } | null;
}

const EVENT_STYLES: Record<string, { color: string; icon: string; label: string }> = {
  pending_assignment: { color: "bg-yellow-400", icon: "🕐", label: "Awaiting plumber" },
  offered:            { color: "bg-blue-400",   icon: "📨", label: "Offer sent" },
  accepted:           { color: "bg-green-500",  icon: "✅", label: "Accepted" },
  rejected:           { color: "bg-red-400",    icon: "❌", label: "Rejected" },
  en_route:           { color: "bg-blue-500",   icon: "🚗", label: "On the way" },
  arrived:            { color: "bg-indigo-500", icon: "📍", label: "Arrived" },
  in_progress:        { color: "bg-orange-500", icon: "🔧", label: "Working" },
  completed:          { color: "bg-green-600",  icon: "🏁", label: "Completed" },
  cancelled:          { color: "bg-gray-400",   icon: "🚫", label: "Cancelled" },
  note:               { color: "bg-gray-400",   icon: "📝", label: "Note" },
};

interface JobTimelineProps {
  events: TimelineEvent[];
}

export function JobTimeline({ events }: JobTimelineProps) {
  if (!events.length) return null;

  return (
    <div className="flex flex-col gap-0">
      {events.map((ev, i) => {
        const style = EVENT_STYLES[ev.eventType] ?? { color: "bg-gray-300", icon: "•", label: ev.eventType };
        const isLast = i === events.length - 1;
        return (
          <div key={ev.id} className="flex gap-3">
            {/* Line + dot */}
            <div className="flex flex-col items-center">
              <div className={`mt-1 h-3 w-3 rounded-full shrink-0 ${style.color}`} />
              {!isLast && <div className="w-px flex-1 bg-gray-200 mt-1" />}
            </div>

            {/* Content */}
            <div className={`pb-4 ${isLast ? "" : ""}`}>
              <div className="flex items-center gap-1.5">
                <span className="text-sm">{style.icon}</span>
                <span className="text-sm font-semibold text-pp-navy">{style.label}</span>
              </div>
              {ev.notes && (
                <p className="mt-0.5 text-xs text-gray-500">{ev.notes}</p>
              )}
              <p className="mt-0.5 text-[11px] text-gray-400">
                {new Date(ev.createdAt).toLocaleString("en-GB", {
                  day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
                })}
                {ev.plumber && ` · ${ev.plumber.name}`}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
