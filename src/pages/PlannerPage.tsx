import React, { useState } from 'react';
import {
  Calendar,
  Plus,
  Trash2,
  Edit2,
  MapPin,
  Clock,
  DollarSign,
  MoveRight,
  Sparkles,
  Users,
  Compass,
  CheckCircle,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Activity, ActivityCategory } from '../types';
import { Modal } from '../components/common/Modal';
import { formatCurrency, formatDate } from '../utils/formatters';

const CATEGORIES: { label: string; value: ActivityCategory }[] = [
  { label: 'Sightseeing', value: 'sightseeing' },
  { label: 'Food & Dining', value: 'food' },
  { label: 'Relaxation & Spa', value: 'relaxation' },
  { label: 'Nature & Adventure', value: 'nature' },
  { label: 'Stay & Check-in', value: 'stay' },
  { label: 'Transport', value: 'transport' },
  { label: 'Other', value: 'other' }
];

export const PlannerPage: React.FC = () => {
  const {
    trips,
    activeTrip,
    setActiveTripId,
    createTrip,
    updateTrip,
    deleteTrip,
    addActivityToTrip,
    updateActivity,
    deleteActivity,
    moveActivityDay,
    resetDemoData
  } = useApp();

  // Modals state
  const [isNewTripModalOpen, setIsNewTripModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [activeDayTarget, setActiveDayTarget] = useState<number>(1);

  // New Trip form state
  const [newTripTitle, setNewTripTitle] = useState('');
  const [newTripDestination, setNewTripDestination] = useState('');
  const [newTripStart, setNewTripStart] = useState('');
  const [newTripEnd, setNewTripEnd] = useState('');
  const [newTripGuests, setNewTripGuests] = useState(2);

  // Activity modal form state
  const [actTitle, setActTitle] = useState('');
  const [actDesc, setActDesc] = useState('');
  const [actCategory, setActCategory] = useState<ActivityCategory>('sightseeing');
  const [actTime, setActTime] = useState('');
  const [actCost, setActCost] = useState('');
  const [actDay, setActDay] = useState(1);

  // Edit notes state
  const [notesText, setNotesText] = useState(activeTrip ? activeTrip.notes : '');

  // Reset demo confirmation
  const handleReset = () => {
    if (window.confirm("Are you sure you want to restore the default demo Bali itinerary? Any custom trips will be reset.")) {
      resetDemoData();
    }
  };

  const openAddActivityModal = (dayNumber: number) => {
    setEditingActivity(null);
    setActTitle('');
    setActDesc('');
    setActCategory('sightseeing');
    setActTime('10:00 AM');
    setActCost('');
    setActDay(dayNumber);
    setIsActivityModalOpen(true);
  };

  const openEditActivityModal = (act: Activity) => {
    setEditingActivity(act);
    setActTitle(act.title);
    setActDesc(act.description);
    setActCategory(act.category);
    setActTime(act.time || '');
    setActCost(act.estimatedCost ? act.estimatedCost.toString() : '');
    setActDay(act.dayNumber);
    setIsActivityModalOpen(true);
  };

  const handleSaveActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTrip || !actTitle.trim()) return;

    if (editingActivity) {
      updateActivity(activeTrip.id, editingActivity.id, {
        title: actTitle.trim(),
        description: actDesc.trim(),
        category: actCategory,
        time: actTime.trim() || undefined,
        estimatedCost: actCost ? Number(actCost) : 0,
        dayNumber: actDay
      });
    } else {
      addActivityToTrip(activeTrip.id, {
        title: actTitle.trim(),
        description: actDesc.trim(),
        category: actCategory,
        dayNumber: actDay,
        time: actTime.trim() || undefined,
        estimatedCost: actCost ? Number(actCost) : 0
      });
    }

    setIsActivityModalOpen(false);
  };

  const handleCreateTripSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTripTitle.trim()) return;

    createTrip({
      title: newTripTitle.trim(),
      destinationName: newTripDestination.trim() || "Unspecified",
      startDate: newTripStart || "2026-11-01",
      endDate: newTripEnd || "2026-11-05",
      guests: newTripGuests,
      notes: "Trip notes & ideas"
    });

    setIsNewTripModalOpen(false);
    setNewTripTitle('');
    setNewTripDestination('');
  };

  if (!activeTrip) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <Compass className="w-16 h-16 text-[#1F6B57] mx-auto opacity-50" />
        <h2 className="font-serif text-3xl font-bold text-[#1D2925]">
          No active trips found
        </h2>
        <p className="text-sm text-[#707873]">
          Create a new trip or restore sample demo itinerary to get started.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => setIsNewTripModalOpen(true)}
            className="px-6 py-2.5 rounded-full bg-[#1F6B57] text-white text-xs font-semibold"
          >
            Create New Trip
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2.5 rounded-full border border-[#E8E8E2] text-xs font-semibold text-[#1D2925]"
          >
            Reset Demo Itinerary
          </button>
        </div>
      </div>
    );
  }

  // Calculate day numbers present in the trip
  const days = [1, 2, 3, 4];
  const maxDayInActivities = activeTrip.activities.reduce((acc, a) => Math.max(acc, a.dayNumber), 4);
  const totalDays = Math.max(4, maxDayInActivities);
  const dayList = Array.from({ length: totalDays }, (_, i) => i + 1);

  // Group activities by day
  const activitiesByDay: { [key: number]: Activity[] } = {};
  dayList.forEach((d) => (activitiesByDay[d] = []));
  activeTrip.activities.forEach((act) => {
    if (!activitiesByDay[act.dayNumber]) activitiesByDay[act.dayNumber] = [];
    activitiesByDay[act.dayNumber].push(act);
  });

  const totalEstimatedBudget = activeTrip.activities.reduce(
    (sum, a) => sum + (a.estimatedCost || 0),
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header & Trip Selector Bar */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E8E2] shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8E8E2]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-[#1F6B57]">
                Trip Itinerary
              </span>
              <span className="text-xs text-[#707873]">•</span>
              <span className="text-xs text-[#707873] flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-[#1F6B57]" />
                Auto-saved in LocalStorage
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1D2925]">
              {activeTrip.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#707873] pt-1">
              <span className="flex items-center gap-1.5 font-medium text-[#1D2925]">
                <MapPin className="w-3.5 h-3.5 text-[#1F6B57]" />
                {activeTrip.destinationName}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#1F6B57]" />
                {formatDate(activeTrip.startDate)} – {formatDate(activeTrip.endDate)}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#1F6B57]" />
                {activeTrip.guests} Travelers
              </span>
            </div>
          </div>

          {/* Trip Switcher / Create Button */}
          <div className="flex items-center gap-2.5 self-start md:self-auto">
            {trips.length > 1 && (
              <select
                value={activeTrip.id}
                onChange={(e) => setActiveTripId(e.target.value)}
                className="text-xs font-semibold px-3 py-2 bg-[#FAF9F6] border border-[#E8E8E2] rounded-xl text-[#1D2925]"
              >
                {trips.map((t) => (
                  <option key={t.id} value={t.id}>{t.title}</option>
                ))}
              </select>
            )}

            <button
              onClick={() => setIsNewTripModalOpen(true)}
              className="px-4 py-2 bg-[#E8F1EC] text-[#1F6B57] hover:bg-[#d6e7df] text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Trip</span>
            </button>

            <button
              onClick={handleReset}
              title="Reset Demo Trip"
              className="p-2 border border-[#E8E8E2] text-[#707873] hover:text-[#1D2925] hover:bg-[#F3F3EE] rounded-xl transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E8E2]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#707873]">Duration</div>
            <div className="text-xl font-bold text-[#1D2925] mt-0.5">{totalDays} Days</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E8E2]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#707873]">Planned Items</div>
            <div className="text-xl font-bold text-[#1F6B57] mt-0.5">{activeTrip.activities.length} Activities</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E8E2]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#707873]">Est. Activity Cost</div>
            <div className="text-xl font-bold text-[#1D2925] mt-0.5">{formatCurrency(totalEstimatedBudget)}</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E8E2]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#707873]">Status</div>
            <div className="text-xl font-bold text-[#DDA66A] mt-0.5">Draft Itinerary</div>
          </div>
        </div>
      </div>

      {/* Day by Day Itinerary Columns / Cards */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-[#1D2925]">
            Daily Schedule
          </h2>
          <button
            onClick={() => openAddActivityModal(1)}
            className="px-4 py-2 bg-[#1F6B57] text-white rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm hover:bg-[#185343] cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Experience</span>
          </button>
        </div>

        <div className="space-y-8">
          {dayList.map((dayNum) => {
            const dayActivities = activitiesByDay[dayNum] || [];

            return (
              <div
                key={dayNum}
                className="bg-white rounded-3xl border border-[#E8E8E2] p-6 sm:p-8 shadow-xs space-y-4"
              >
                {/* Day Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E2]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#1F6B57] text-white flex items-center justify-center font-serif font-bold text-sm">
                      D{dayNum}
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#1D2925]">
                        Day {dayNum}
                      </h3>
                      <span className="text-xs text-[#707873]">
                        {dayActivities.length} {dayActivities.length === 1 ? 'activity' : 'activities'} scheduled
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => openAddActivityModal(dayNum)}
                    className="p-1.5 rounded-lg text-[#1F6B57] hover:bg-[#E8F1EC] text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add to Day {dayNum}</span>
                  </button>
                </div>

                {/* Day Activities List */}
                {dayActivities.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {dayActivities.map((act) => (
                      <div
                        key={act.id}
                        className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E8E2] flex flex-col justify-between hover:border-[#1F6B57]/50 transition-colors group"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#E8E8E2] text-[10px] font-bold uppercase tracking-wider text-[#1F6B57]">
                              {act.category}
                            </span>
                            {act.time && (
                              <span className="flex items-center gap-1 text-[11px] font-semibold text-[#707873]">
                                <Clock className="w-3 h-3 text-[#DDA66A]" />
                                {act.time}
                              </span>
                            )}
                          </div>

                          <h4 className="text-sm font-bold text-[#1D2925] group-hover:text-[#1F6B57] transition-colors">
                            {act.title}
                          </h4>

                          <p className="text-xs text-[#707873] leading-relaxed line-clamp-2">
                            {act.description}
                          </p>
                        </div>

                        {/* Activity Card Footer */}
                        <div className="pt-3 mt-3 border-t border-[#E8E8E2] flex items-center justify-between text-xs">
                          <div className="font-semibold text-[#1D2925]">
                            {act.estimatedCost ? formatCurrency(act.estimatedCost) : 'Free / Included'}
                          </div>

                          {/* Action Buttons: Day Mover & Edit/Delete */}
                          <div className="flex items-center gap-1">
                            {/* Move Day Selector */}
                            <select
                              value={act.dayNumber}
                              onChange={(e) => moveActivityDay(activeTrip.id, act.id, Number(e.target.value))}
                              title="Move to another day"
                              className="text-[10px] py-1 px-1.5 bg-white border border-[#E8E8E2] rounded-md text-[#707873] cursor-pointer"
                            >
                              {dayList.map((d) => (
                                <option key={d} value={d}>To D{d}</option>
                              ))}
                            </select>

                            <button
                              onClick={() => openEditActivityModal(act)}
                              title="Edit Activity"
                              className="p-1 rounded text-[#707873] hover:text-[#1D2925] hover:bg-white"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => deleteActivity(activeTrip.id, act.id)}
                              title="Delete Activity"
                              className="p-1 rounded text-[#707873] hover:text-[#B54747] hover:bg-white"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center border-2 border-dashed border-[#E8E8E2] rounded-2xl p-4">
                    <p className="text-xs text-[#707873] mb-2">No activities yet for Day {dayNum}.</p>
                    <button
                      onClick={() => openAddActivityModal(dayNum)}
                      className="text-xs font-semibold text-[#1F6B57] hover:underline"
                    >
                      + Add a local dining, tour, or stay experience
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Trip Notes Section */}
      <div className="bg-white rounded-3xl border border-[#E8E8E2] p-6 sm:p-8 space-y-4 shadow-xs">
        <h3 className="font-serif text-xl font-bold text-[#1D2925]">
          Trip Notes & packing list
        </h3>
        <textarea
          rows={3}
          value={notesText}
          onChange={(e) => setNotesText(e.target.value)}
          onBlur={() => updateTrip(activeTrip.id, { notes: notesText })}
          placeholder="Jot down packing reminders, flight codes, emergency contacts, or packing essentials..."
          className="w-full text-xs sm:text-sm p-4 rounded-2xl border border-[#E8E8E2] bg-[#FAF9F6] text-[#1D2925] focus:outline-none focus:border-[#1F6B57]"
        />
        <div className="text-[11px] text-[#707873] flex items-center justify-between">
          <span>Notes auto-save when you click away.</span>
          <button
            onClick={() => updateTrip(activeTrip.id, { notes: notesText })}
            className="text-xs font-semibold text-[#1F6B57] hover:underline"
          >
            Save Notes
          </button>
        </div>
      </div>

      {/* MODAL: ADD / EDIT ACTIVITY */}
      <Modal
        isOpen={isActivityModalOpen}
        onClose={() => setIsActivityModalOpen(false)}
        title={editingActivity ? "Edit Activity" : `Add Activity to Day ${actDay}`}
      >
        <form onSubmit={handleSaveActivity} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#707873] block mb-1">
              Activity Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rice Terrace Walk, Sunset Dinner..."
              value={actTitle}
              onChange={(e) => setActTitle(e.target.value)}
              className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-[#E8E8E2] bg-[#FAF9F6] focus:outline-none focus:border-[#1F6B57]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#707873] block mb-1">
                Category
              </label>
              <select
                value={actCategory}
                onChange={(e) => setActCategory(e.target.value as ActivityCategory)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#E8E8E2] bg-[#FAF9F6]"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#707873] block mb-1">
                Assign to Day
              </label>
              <select
                value={actDay}
                onChange={(e) => setActDay(Number(e.target.value))}
                className="w-full text-xs p-2.5 rounded-xl border border-[#E8E8E2] bg-[#FAF9F6]"
              >
                {dayList.map((d) => (
                  <option key={d} value={d}>Day {d}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#707873] block mb-1">
                Time (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. 10:00 AM"
                value={actTime}
                onChange={(e) => setActTime(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-[#E8E8E2] bg-[#FAF9F6]"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#707873] block mb-1">
                Est. Cost in ₹ (Optional)
              </label>
              <input
                type="number"
                placeholder="e.g. 1500"
                value={actCost}
                onChange={(e) => setActCost(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-[#E8E8E2] bg-[#FAF9F6]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#707873] block mb-1">
              Short Description / Notes
            </label>
            <textarea
              rows={2}
              placeholder="What to do, dress code, reservations needed..."
              value={actDesc}
              onChange={(e) => setActDesc(e.target.value)}
              className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-[#E8E8E2] bg-[#FAF9F6]"
            />
          </div>

          <div className="pt-4 border-t border-[#E8E8E2] flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsActivityModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-[#E8E8E2] text-[#707873]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-xs font-semibold rounded-xl bg-[#1F6B57] text-white shadow-md hover:bg-[#185343]"
            >
              {editingActivity ? "Save Changes" : "Add to Itinerary"}
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL: CREATE NEW TRIP */}
      <Modal
        isOpen={isNewTripModalOpen}
        onClose={() => setIsNewTripModalOpen(false)}
        title="Create a New Trip"
      >
        <form onSubmit={handleCreateTripSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#707873] block mb-1">
              Trip Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Japan Autumn Teahouse Tour"
              value={newTripTitle}
              onChange={(e) => setNewTripTitle(e.target.value)}
              className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-[#E8E8E2] bg-[#FAF9F6]"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#707873] block mb-1">
              Destination Name
            </label>
            <input
              type="text"
              placeholder="e.g. Kyoto, Japan"
              value={newTripDestination}
              onChange={(e) => setNewTripDestination(e.target.value)}
              className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-[#E8E8E2] bg-[#FAF9F6]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#707873] block mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={newTripStart}
                onChange={(e) => setNewTripStart(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#E8E8E2] bg-[#FAF9F6]"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#707873] block mb-1">
                End Date
              </label>
              <input
                type="date"
                value={newTripEnd}
                onChange={(e) => setNewTripEnd(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#E8E8E2] bg-[#FAF9F6]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#707873] block mb-1">
              Guests
            </label>
            <select
              value={newTripGuests}
              onChange={(e) => setNewTripGuests(Number(e.target.value))}
              className="w-full text-xs p-2.5 rounded-xl border border-[#E8E8E2] bg-[#FAF9F6]"
            >
              <option value={1}>1 Traveler</option>
              <option value={2}>2 Travelers</option>
              <option value={3}>3 Travelers</option>
              <option value={4}>4 Travelers</option>
              <option value={6}>6+ Travelers</option>
            </select>
          </div>

          <div className="pt-4 border-t border-[#E8E8E2] flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsNewTripModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-[#E8E8E2] text-[#707873]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-xs font-semibold rounded-xl bg-[#1F6B57] text-white shadow-md hover:bg-[#185343]"
            >
              Start Planning
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

