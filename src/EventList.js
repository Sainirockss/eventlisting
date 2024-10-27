import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './EventList.css';
import loader from './assests/loader.gif';

// Debounce function
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

// Main EventList Component
const EventList = () => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sortOption, setSortOption] = useState('date'); // Default sorting option
    const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
    const eventsPerPage = 10; // Number of events to display per page
    
    // Debounce search input
    const debouncedSearch = useDebounce(search, 300);

    // Fetch data from the API
    useEffect(() => {
        fetch('https://671e4c8b1dfc42991981da17.mockapi.io/api/v1/events')
            .then(response => response.json())
            .then(data => {
                setEvents(data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Filter events based on search query
    const filteredEvents = events.filter(event =>
        event.eventName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        event.location.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    // Sort events based on selected option
    const sortedEvents = filteredEvents.sort((a, b) => {
        if (sortOption === 'date') {
            return new Date(a.eventDate) - new Date(b.eventDate);
        } else {
            return a.eventName.localeCompare(b.eventName);
        }
    });

    // Pagination Logic
    const totalPages = Math.ceil(sortedEvents.length / eventsPerPage);
    const currentEvents = sortedEvents.slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage);

    // Display more details in modal
    const showEventDetails = (event) => setSelectedEvent(event);
    const closeModal = () => setSelectedEvent(null);

    return (
        <div className="event-list-container">
            <input
                type="text"
                placeholder="Search by event name or location"
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
            />
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="sort-select">
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
            </select>
            {loading ? (
                <div className="loading-spinner">
        <img src={loader} alt="Loading..." className="loader-image" />
        <p>Loading events...</p>
    </div>
            ) : (
                <div className="event-list">
                    {currentEvents.map(event => (
                        <div
                            key={event.id}
                            className="event-card"
                            onClick={() => showEventDetails(event)}
                        >
                            <img src={event.imageUrl} alt={event.eventName} className="event-image" />
                            <h3>{event.eventName}</h3>
                            <p>{event.eventDate}</p>
                            <p>{event.location}</p>
                        </div>
                    ))}
                </div>
            )}

            {selectedEvent && (
                <Modal
                    isOpen={!!selectedEvent}
                    onRequestClose={closeModal}
                    className="modal"
                    overlayClassName="modal-overlay"
                >
                    <button onClick={closeModal} className="modal-close-button">&times;</button>
                    <h2>{selectedEvent.eventName}</h2>
                    <p><strong>Date:</strong> {selectedEvent.eventDate}</p>
                    <p><strong>Location:</strong> {selectedEvent.location}</p>
                    <p><strong>Description:</strong> {selectedEvent.description}</p>
                    {selectedEvent.imageUrl && <img src={selectedEvent.imageUrl} alt={selectedEvent.eventName} className="modal-image" />}
                </Modal>
            )}

            {/* Pagination Controls */}
            <div className="pagination-controls">
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default EventList;
