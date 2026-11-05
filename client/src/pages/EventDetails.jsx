import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowLeft,
  CheckCircle,
  Share2,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import { eventsApi } from '../services/api';
import Badge from '../components/common/Badge';
import LoadingSpinner from '../components/common/LoadingSpinner';

export const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpError, setRsvpError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const res = await eventsApi.getById(id);
        if (res.data.success) {
          setEvent(res.data.data);
          setUpcomingEvents(res.data.upcomingEvents || []);
        }
      } catch (err) {
        console.error('Failed to load event details:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
    window.scrollTo(0, 0);
  }, [id]);

  const handleRsvp = async () => {
    setRsvpLoading(true);
    setRsvpError('');
    try {
      const res = await eventsApi.register(id, {});
      if (res.data.success) {
        setRsvpSuccess(true);
        setEvent(res.data.data);
      }
    } catch (err) {
      setRsvpError(err.response?.data?.message || 'Failed to complete registration.');
    } finally {
      setRsvpLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="py-24">
        <LoadingSpinner message="Loading event information..." />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-slate-400 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-800">Event Not Found</h2>
        <p className="text-sm text-slate-500">
          The event you are looking for does not exist or has been concluded.
        </p>
        <Link to="/events" className="btn-primary py-2.5 px-6 text-sm inline-flex items-center space-x-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Events</span>
        </Link>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const isPast = eventDate < new Date();
  const isFull = (event.registeredCount || 0) >= (event.capacity || 100);

  return (
    <div className="space-y-16 pb-20">
      {/* Top Header */}
      <section className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/events"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Events</span>
          </Link>
          <div className="max-w-3xl space-y-3">
            <Badge variant={isPast ? 'completed' : event.status}>
              {isPast ? 'Completed' : event.status}
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              {event.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content & RSVP Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Media & Story */}
          <div className="lg:col-span-8 space-y-8">
            <div className="rounded-3xl overflow-hidden shadow-md bg-slate-100 aspect-video relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-soft space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Event Details & Schedule</h2>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {event.description}
              </div>

              {/* Registration Instructions */}
              <div className="pt-6 border-t border-slate-100 space-y-3">
                <h3 className="text-base font-bold text-slate-900">Volunteer & Attendee Guidelines</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {event.registrationInfo || 'Open to all community members and registered volunteers.'}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-seva-600" />
                  <span>Organized by: {event.organizer || 'Seva NGO Volunteer Chapter'}</span>
                </div>
                <button
                  onClick={handleShare}
                  className="btn-secondary py-2 px-3 text-xs flex items-center space-x-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copied ? 'Link Copied!' : 'Share Event'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Date, Location & RSVP */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-soft space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Event Logistics
              </h3>

              <div className="space-y-4 text-sm text-slate-600">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-seva-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold">Date</strong>
                    <span>{eventDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-seva-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold">Time</strong>
                    <span>{event.time || '10:00 AM - 02:00 PM'}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-seva-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold">Location</strong>
                    <span>{event.location}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-seva-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold">Registrations</strong>
                    <span>
                      {event.registeredCount || 0} registered out of {event.capacity || 100} slots
                    </span>
                  </div>
                </div>
              </div>

              {/* RSVP Action */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                {rsvpSuccess ? (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
                    <CheckCircle className="w-6 h-6 text-seva-600 mx-auto" />
                    <p className="font-bold text-sm text-seva-900">Registration Confirmed!</p>
                    <p className="text-xs text-seva-700">
                      We look forward to seeing you at the drive.
                    </p>
                  </div>
                ) : isPast ? (
                  <div className="p-3.5 rounded-xl bg-slate-100 text-center text-xs font-semibold text-slate-600">
                    This event has concluded.
                  </div>
                ) : isFull ? (
                  <div className="p-3.5 rounded-xl bg-amber-50 text-amber-800 text-center text-xs font-semibold">
                    Capacity reached for this drive.
                  </div>
                ) : (
                  <>
                    <button
                      onClick={handleRsvp}
                      disabled={rsvpLoading}
                      className="btn-primary w-full py-3.5 text-sm flex items-center justify-center space-x-2"
                    >
                      <Users className="w-4 h-4" />
                      <span>{rsvpLoading ? 'Registering...' : 'Confirm RSVP / Sign Up'}</span>
                    </button>
                    {rsvpError && (
                      <p className="text-xs text-red-600 text-center">{rsvpError}</p>
                    )}
                  </>
                )}

                <Link
                  to="/volunteer"
                  className="btn-secondary w-full py-2.5 text-xs text-center block"
                >
                  Apply as Full-Time Volunteer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Other Events */}
      {upcomingEvents.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200/60 pt-16">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-slate-900">Other Upcoming Gatherings</h3>
            <p className="text-sm text-slate-500 mt-1">Explore other ways to get involved this month.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((item) => (
              <div key={item._id} className="card-ngo flex flex-col justify-between">
                <div>
                  <div className="h-44 overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm line-clamp-2">
                      <Link to={`/events/${item._id}`}>{item.title}</Link>
                    </h4>
                    <p className="text-xs text-slate-500">{new Date(item.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <Link
                    to={`/events/${item._id}`}
                    className="btn-secondary w-full py-2 text-xs text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default EventDetails;
