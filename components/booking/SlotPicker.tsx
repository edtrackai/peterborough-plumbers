"use client";

interface Slot {
  id: string;
  date: string; // "YYYY-MM-DD"
  startTime: string;
  endTime: string;
  spotsLeft: number;
}

interface SlotPickerProps {
  slots: Slot[];
  zone: { prefix: string; zoneName: string };
  postcode: string;
  onSelect: (slot: Slot) => void;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function groupByDate(slots: Slot[]): Map<string, Slot[]> {
  const map = new Map<string, Slot[]>();
  for (const s of slots) {
    const list = map.get(s.date) ?? [];
    list.push(s);
    map.set(s.date, list);
  }
  return map;
}

export function SlotPicker({ slots, zone, postcode, onSelect }: SlotPickerProps) {
  const grouped = groupByDate(slots);
  const earliestSlotId = slots[0]?.id;

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-pp-navy mb-1">Choose a Time Slot</h2>
        <p className="text-sm text-pp-body">
          Serving <strong>{postcode}</strong> — {zone.zoneName}
        </p>
      </div>

      {Array.from(grouped.entries()).map(([date, daySlots]) => (
        <div key={date}>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            {formatDate(date)}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {daySlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => onSelect(slot)}
                className="relative rounded-xl border border-gray-200 bg-white p-4 text-left hover:border-pp-teal hover:shadow-md transition-all group"
              >
                {slot.id === earliestSlotId && (
                  <span className="absolute -top-2.5 left-3 rounded-full bg-pp-teal px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wide">
                    Earliest
                  </span>
                )}
                <p className="font-semibold text-pp-navy text-base group-hover:text-pp-teal transition-colors">
                  {slot.startTime} – {slot.endTime}
                </p>
                <p className="text-sm text-gray-500 mt-0.5">
                  {slot.spotsLeft === 1 ? (
                    <span className="text-amber-600 font-medium">Last slot!</span>
                  ) : (
                    <span>{slot.spotsLeft} spots left</span>
                  )}
                </p>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
