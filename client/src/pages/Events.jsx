import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Users, Search, Sparkles, ArrowRight } from 'lucide-react';
import { eventsApi } from '../services/api';
import Badge from '../components/common/Badge';
import LoadingSpinner from '../components/common/LoadingSpinner';

export const Events = () => {
  const [events, setEvents] = useState([]);
  const [tab, setTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const params = {};
        if (tab === 'upcoming') params.upcoming = 'true';
        if (searchTerm.trim()) params.search = searchTerm.trim();

        const res = await eventsApi.getAll(params);
        if (res.data.success) {
          setEvents(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load events:', err.message);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchEvents, 200);
    return () => clearTimeout(timer);
  }, [tab, searchTerm]);

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="bg-slate-900 text-white py-16 sm:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Community Gatherings</span>
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Events & Volunteer Drives
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Join hands with hundreds of fellow citizens on the ground. Everyone is welcome to participate.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setTab('upcoming')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                tab === 'upcoming'
                  ? 'bg-seva-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Upcoming Drives
            </button>
            <button
              onClick={() => setTab('all')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                tab === 'all'
                  ? 'bg-seva-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All & Past Events
            </button>
          </div>

          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by event title, location, or drive type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 text-sm py-2.5"
            />
          </div>
        </div>
      </section>

      {/* Events Listing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <LoadingSpinner message="Loading events from database..." />
        ) : events.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No events found</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              There are currently no events matching your criteria. Check back soon or switch tabs to view past initiatives.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => {
              const eventDate = new Date(event.date);
              const isPast = eventDate < new Date();

              return (
                <div key={event._id} className="card-ngo flex flex-col justify-between group">
                  <div>
                    <div className="relative h-52 overflow-hidden bg-slate-100">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Date Badge */}
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md rounded-xl p-2 text-center shadow-md min-w-[54px]">
                        <span className="text-[10px] font-bold text-seva-700 uppercase block">
                          {eventDate.toLocaleDateString('en-US', { month: 'short' })}
                        </span>
                        <span className="text-lg font-black text-slate-900 block leading-tight">
                          {eventDate.getDate()}
                        </span>
                      </div>

                      <div className="absolute top-3 left-3">
                        <Badge variant={isPast ? 'completed' : event.status}>
                          {isPast ? 'Completed' : event.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-2 hover:text-seva-600 transition-colors">
                        <Link to={`/events/${event._id}`}>{event.title}</Link>
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {event.shortDescription || event.description}
                      </p>

                      <div className="pt-2 space-y-1.5 text-xs text-slate-500 border-t border-slate-100">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{event.time || '10:00 AM - 02:00 PM'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>Organizer: {event.organizer || 'Seva Team'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">
                      <strong>{event.registeredCount || 0}</strong> / {event.capacity || 100} Joined
                    </span>
                    <Link
                      to={`/events/${event._id}`}
                      className="btn-primary py-2 px-4 text-xs font-semibold"
                    >
                      {isPast ? 'View Summary' : 'Details & RSVP'}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Events;
