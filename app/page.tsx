"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Bot,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Car,
  Check,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  Clock3,
  Contact,
  FileText,
  Gauge,
  Globe2,
  Hotel,
  Landmark,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Plane,
  Plus,
  Search,
  Send,
  ShipWheel,
  Sparkles,
  Star,
  Ticket,
  Users,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Service = {
  title: string;
  icon: typeof Plane;
  summary: string;
  destinations: string[];
  price: string;
  processing: string;
  inclusions: string[];
  documents: string[];
  policy: string;
};

type Lead = {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  nationality: string;
  residence: string;
  destination: string;
  travelDate: string;
  returnDate: string;
  adults: string;
  children: string;
  hotel: string;
  budget: string;
  service: string;
  status: string;
  priority: string;
  source: string;
  assigned: string;
  updated: string;
  notes: string;
};

type Message = {
  role: "user" | "assistant";
  text: string;
};

const services: Service[] = [
  {
    title: "Visa Services",
    icon: FileText,
    summary:
      "UAE 30 and 60 day travel visas plus Dependent, Parent, Freelance, Golden, business, and tourist visa support for international destinations.",
    destinations: ["UAE", "Schengen", "UK", "USA", "Singapore", "Japan"],
    price: "Quotation based on nationality, visa type, and urgency",
    processing: "Standard and express options subject to embassy and immigration approval",
    inclusions: ["Document checklist", "Application review", "Submission guidance", "Status follow-up"],
    documents: ["Passport copy", "Photo", "Residence visa or Emirates ID when applicable", "Travel plan"],
    policy: "Visa fees and refunds depend on authority rules; complex cases are transferred to a human consultant."
  },
  {
    title: "Flight Booking",
    icon: Plane,
    summary:
      "International and regional flight booking support with routing advice, schedule comparison, and fare monitoring.",
    destinations: ["Dubai", "Abu Dhabi", "Europe", "Asia", "Maldives", "Worldwide"],
    price: "Live airline fares plus service fee where applicable",
    processing: "Instant quotation after dates, passengers, and passport names are confirmed",
    inclusions: ["Fare options", "Baggage guidance", "Transit advice", "Ticket confirmation"],
    documents: ["Passenger names", "Passport details", "Travel dates", "Preferred cabin"],
    policy: "Airline change, refund, and cancellation rules apply to every ticket."
  },
  {
    title: "Hotel Booking",
    icon: Hotel,
    summary:
      "Luxury and budget hotel stays arranged around location, category, family needs, corporate rates, and special requests.",
    destinations: ["Dubai", "Abu Dhabi", "Maldives", "Singapore", "Italy", "Worldwide"],
    price: "Budget, four-star, five-star, and luxury quote ranges available",
    processing: "Same-day shortlist after city, dates, room count, and budget are received",
    inclusions: ["Hotel shortlist", "Room category advice", "Breakfast options", "Confirmation support"],
    documents: ["Guest names", "Check-in date", "Check-out date", "Room preference"],
    policy: "Cancellation windows vary by hotel, rate plan, season, and supplier."
  },
  {
    title: "Holiday Packages",
    icon: Globe2,
    summary:
      "Tailored individual and group journeys across iconic landmarks and hidden gems, planned around comfort and memorable experiences.",
    destinations: ["France", "Iceland", "Italy", "Japan", "Maldives", "Singapore"],
    price: "Custom package quote after travel style, dates, and hotel category",
    processing: "Draft itinerary usually prepared after lead qualification",
    inclusions: ["Itinerary planning", "Hotel options", "Tours", "Transfers", "Attraction tickets"],
    documents: ["Traveller count", "Travel dates", "Budget", "Destination preferences"],
    policy: "Package cancellation depends on each hotel, tour, airline, and attraction supplier."
  },
  {
    title: "City Tours",
    icon: Landmark,
    summary:
      "Guided sightseeing in Dubai, Abu Dhabi, and Khorfakkan with comfortable day trips, local stories, and major landmarks.",
    destinations: ["Dubai", "Abu Dhabi", "Khorfakkan"],
    price: "Shared and private city tour options",
    processing: "Usually confirmable after date, pickup area, and group size",
    inclusions: ["Pickup coordination", "Guide support", "Landmark route", "Comfortable vehicle"],
    documents: ["Lead guest name", "Pickup location", "Date", "Group size"],
    policy: "Weather, traffic, attraction hours, and no-show terms may affect schedules."
  },
  {
    title: "Desert Safari",
    icon: Sparkles,
    summary:
      "Private or shared desert safari experiences with dune bashing, BBQ dinner, live entertainment, and golden Arabian desert views.",
    destinations: ["Dubai Desert", "Lahbab", "Al Awir"],
    price: "Shared, private, premium camp, quad bike, and buggy options",
    processing: "Same-day availability may be possible depending on season",
    inclusions: ["Dune bashing", "BBQ dinner", "Live shows", "Pickup options"],
    documents: ["Guest count", "Pickup area", "Date", "Private or shared preference"],
    policy: "Activities can be adjusted for safety, weather, age, pregnancy, or health restrictions."
  },
  {
    title: "Yacht Rental",
    icon: ShipWheel,
    summary:
      "Private yacht dinners and luxury rides with views of Dubai Marina, Canal, Creek, and skyline routes.",
    destinations: ["Dubai Marina", "Dubai Canal", "Dubai Creek", "Palm Jumeirah"],
    price: "Hourly yacht rental, dinner cruise, and limousine combinations",
    processing: "Availability check after date, hours, route, and guest count",
    inclusions: ["Crew coordination", "Route planning", "Optional catering", "Decor add-ons"],
    documents: ["Host name", "Date", "Guest count", "Preferred duration"],
    policy: "Marine weather, supplier availability, and deposit rules apply."
  },
  {
    title: "Airport Transfers",
    icon: Car,
    summary:
      "Luxury cars and courteous drivers for airport, hotel, city, corporate, and private transfers.",
    destinations: ["Dubai", "Abu Dhabi", "Sharjah", "Northern Emirates"],
    price: "Sedan, SUV, van, limousine, and group transport rates",
    processing: "Fast confirmation after flight number and pickup details",
    inclusions: ["Driver assignment", "Flight timing support", "Pickup coordination", "Vehicle options"],
    documents: ["Flight number", "Pickup location", "Drop location", "Passenger count"],
    policy: "Waiting time, route changes, and late-night surcharges may apply."
  },
  {
    title: "Attractions & Tickets",
    icon: Ticket,
    summary:
      "Discounted tickets and smooth planning for major global attractions including Dubai Frame, Ferrari World, Atlantis, Museum of the Future, and Burj Khalifa.",
    destinations: ["Dubai Frame", "Ferrari World", "Atlantis", "Museum of the Future", "Burj Khalifa"],
    price: "Best available supplier pricing at time of booking",
    processing: "Instant to same-day depending on attraction slot availability",
    inclusions: ["Ticket options", "Slot guidance", "Entry rules", "Combination ideas"],
    documents: ["Guest count", "Date", "Preferred time slot", "Contact number"],
    policy: "Ticket refunds and changes depend on attraction rules and booked slot type."
  },
  {
    title: "Corporate Travel",
    icon: BriefcaseBusiness,
    summary:
      "Managed travel support for teams, executives, meetings, incentives, city movement, and hospitality planning.",
    destinations: ["UAE", "GCC", "Europe", "Asia", "Worldwide"],
    price: "Account-based quote with negotiated hotel, flight, transfer, and activity components",
    processing: "Consultant-led onboarding for policies, approvers, travellers, and reporting",
    inclusions: ["Traveller profiles", "Quotation workflow", "Priority support", "Reporting"],
    documents: ["Company name", "Traveller list", "Policy requirements", "Billing details"],
    policy: "Corporate terms are configured by agreement and supplier conditions."
  }
];

const defaultLeads: Lead[] = [
  {
    id: "NT-1024",
    name: "Aarav Mehta",
    phone: "+971501112233",
    whatsapp: "+971501112233",
    email: "aarav@example.com",
    nationality: "Indian",
    residence: "UAE",
    destination: "Japan",
    travelDate: "2026-08-18",
    returnDate: "2026-08-27",
    adults: "2",
    children: "1",
    hotel: "5 Star",
    budget: "AED 28000",
    service: "Holiday Packages",
    status: "Qualified",
    priority: "High",
    source: "WhatsApp",
    assigned: "Sushil Agrawal",
    updated: "Today",
    notes: "Family holiday. Needs visa, flights, hotel, and Disney add-on."
  },
  {
    id: "NT-1025",
    name: "Maya Thomas",
    phone: "+971557770001",
    whatsapp: "+971557770001",
    email: "maya@example.com",
    nationality: "Filipino",
    residence: "UAE",
    destination: "Dubai Desert",
    travelDate: "2026-08-02",
    returnDate: "2026-08-02",
    adults: "6",
    children: "0",
    hotel: "Not required",
    budget: "AED 1800",
    service: "Desert Safari",
    status: "Quotation Sent",
    priority: "Medium",
    source: "Website",
    assigned: "Sales Team",
    updated: "1h ago",
    notes: "Asked for private pickup and premium camp."
  },
  {
    id: "NT-1026",
    name: "Omar Khan",
    phone: "+971559991212",
    whatsapp: "+971559991212",
    email: "omar@example.com",
    nationality: "Pakistani",
    residence: "UAE",
    destination: "Schengen",
    travelDate: "2026-09-12",
    returnDate: "2026-09-28",
    adults: "1",
    children: "0",
    hotel: "4 Star",
    budget: "AED 9000",
    service: "Visa Services",
    status: "New Lead",
    priority: "High",
    source: "Instagram",
    assigned: "Unassigned",
    updated: "15m ago",
    notes: "Needs document checklist and appointment guidance."
  }
];

const stages = ["New Lead", "Contacted", "Qualified", "Quotation Sent", "Negotiation", "Booked", "Completed", "Lost"];
const menuStarters = ["Hi", "Hello", "Hey", "Good Morning", "Good Evening", "Start", "Help", "Info"];

const blankLead: Omit<Lead, "id" | "status" | "priority" | "source" | "assigned" | "updated" | "notes"> = {
  name: "",
  phone: "",
  whatsapp: "",
  email: "",
  nationality: "",
  residence: "",
  destination: "",
  travelDate: "",
  returnDate: "",
  adults: "1",
  children: "0",
  hotel: "",
  budget: "",
  service: "Holiday Packages"
};

function findService(input: string) {
  const text = input.toLowerCase();
  return services.find((service) =>
    [service.title, ...service.destinations, service.summary].some((item) => item.toLowerCase().includes(text) || text.includes(item.toLowerCase().split(" ")[0]))
  );
}

function serviceAnswer(service: Service) {
  return `${service.title}: ${service.summary}

Destinations: ${service.destinations.join(", ")}.
Price range: ${service.price}.
Processing time: ${service.processing}.
Inclusions: ${service.inclusions.join(", ")}.
Required details: ${service.documents.join(", ")}.
Cancellation/refund note: ${service.policy}

Would you like me to create a quotation request? I will ask one question at a time.`;
}

export default function Home() {
  const [dark, setDark] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Welcome to NEON TOURISM FZE. I can help with visas, flights, hotels, tours, safaris, yachts, transfers, attraction tickets, and custom holidays."
    }
  ]);
  const [leads, setLeads] = useState<Lead[]>(defaultLeads);
  const [leadForm, setLeadForm] = useState(blankLead);
  const [query, setQuery] = useState("");
  const [activeService, setActiveService] = useState(services[0].title);

  useEffect(() => {
    const saved = window.localStorage.getItem("neon-leads");
    if (saved) setLeads(JSON.parse(saved));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("neon-leads", JSON.stringify(leads));
  }, [leads]);

  const filteredLeads = useMemo(() => {
    const needle = query.toLowerCase();
    return leads.filter((lead) => Object.values(lead).join(" ").toLowerCase().includes(needle));
  }, [leads, query]);

  const stats = useMemo(() => {
    const booked = leads.filter((lead) => ["Booked", "Completed"].includes(lead.status)).length;
    return [
      ["Total Leads", leads.length.toString(), Users],
      ["Today's Leads", "7", Clock3],
      ["Conversion Rate", `${Math.round((booked / Math.max(leads.length, 1)) * 100)}%`, Gauge],
      ["Revenue Pipeline", "AED 142K", CircleDollarSign],
      ["Pending Follow-ups", "11", CalendarDays],
      ["WhatsApp Chats", messages.length.toString(), MessageCircle]
    ];
  }, [leads, messages.length]);

  const selectedService = services.find((service) => service.title === activeService) ?? services[0];

  const addLead = () => {
    const emailValid = /\S+@\S+\.\S+/.test(leadForm.email);
    const phoneValid = /^\+?[0-9\s-]{8,}$/.test(leadForm.phone);
    if (!leadForm.name || !phoneValid || !emailValid || !leadForm.destination) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: "I need a valid name, phone number, email, and destination before I can create the CRM lead."
        }
      ]);
      setChatOpen(true);
      return;
    }

    const duplicate = leads.find((lead) => lead.phone === leadForm.phone || lead.email.toLowerCase() === leadForm.email.toLowerCase());
    const newLead: Lead = {
      ...leadForm,
      whatsapp: leadForm.whatsapp || leadForm.phone,
      id: duplicate?.id ?? `NT-${1027 + leads.length}`,
      status: duplicate ? duplicate.status : "New Lead",
      priority: leadForm.budget ? "High" : "Medium",
      source: "Website",
      assigned: duplicate?.assigned ?? "Sales Team",
      updated: "Just now",
      notes: duplicate ? `${duplicate.notes} Updated from new enquiry.` : "Auto-created from website quotation form."
    };

    setLeads((current) => duplicate ? current.map((lead) => (lead.id === duplicate.id ? newLead : lead)) : [newLead, ...current]);
    setLeadForm(blankLead);
    setMessages((current) => [
      ...current,
      {
        role: "assistant",
        text: `Lead ${newLead.id} is saved in CRM, assigned to ${newLead.assigned}, queued for WhatsApp confirmation, email confirmation, quotation request, and follow-up reminder.`
      }
    ]);
    setChatOpen(true);
  };

  const sendMessage = (message = input) => {
    if (!message.trim()) return;
    const userMessage: Message = { role: "user", text: message };
    const normalized = message.trim().toLowerCase();
    let reply = "";

    if (menuStarters.some((starter) => normalized === starter.toLowerCase())) {
      reply = `Welcome to NEON TOURISM FZE!

We're delighted to help you plan your perfect journey.

Please select one of our services below: ${services.map((service) => service.title).join(", ")}.`;
    } else {
      const service = findService(message);
      if (service) {
        setActiveService(service.title);
        reply = serviceAnswer(service);
      } else if (normalized.includes("price") || normalized.includes("quote") || normalized.includes("book")) {
        reply = "Absolutely. I can prepare a quotation request. May I have your full name first?";
      } else if (normalized.includes("contact") || normalized.includes("phone") || normalized.includes("whatsapp")) {
        reply = "You can reach NEON TOURISM FZE in Dubai at +971 557529042 on phone or WhatsApp, or email sushil@neontourism.com.";
      } else {
        reply =
          "I am sorry, I could not find that in the Neon Tourism knowledge base. I will transfer this to a human travel consultant so you receive accurate guidance.";
      }
    }

    setMessages((current) => [...current, userMessage, { role: "assistant", text: reply }]);
    setInput("");
  };

  const moveLead = (leadId: string, status: string) => {
    setLeads((current) => current.map((lead) => (lead.id === leadId ? { ...lead, status, updated: "Just now" } : lead)));
  };

  return (
    <main className={dark ? "theme-dark" : "theme-light"}>
      <div className="site-shell">
        <header className="nav">
          <a className="brand" href="#home" aria-label="NEON TOURISM FZE home">
            <span className="brand-mark">N</span>
            <span>
              <strong>NEON TOURISM FZE</strong>
              <small>Dubai travel concierge</small>
            </span>
          </a>
          <nav aria-label="Primary navigation">
            {["Services", "AI Agent", "CRM", "Dashboard", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`}>{item}</a>
            ))}
          </nav>
          <div className="nav-actions">
            <button className="icon-button" aria-label="Toggle menu"><Menu size={18} /></button>
            <button className="mode-toggle" onClick={() => setDark((value) => !value)} aria-label="Toggle light and dark mode">
              {dark ? "Light" : "Dark"}
            </button>
          </div>
        </header>

        <section id="home" className="hero-section">
          <div className="hero-copy">
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="eyebrow">
              Travel simplified from Dubai
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
              AI-powered journeys, human travel expertise.
            </motion.h1>
            <p>
              A premium travel website, WhatsApp sales agent, CRM, booking desk, and analytics cockpit for NEON TOURISM FZE, grounded in the company’s real services and Dubai contact details.
            </p>
            <div className="hero-actions">
              <Button onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}><CalendarDays size={16} /> Book Now</Button>
              <Button variant="glass" onClick={() => setChatOpen(true)}><MessageCircle size={16} /> WhatsApp Us</Button>
              <Button variant="glass" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}><Contact size={16} /> Talk To Expert</Button>
            </div>
            <div className="trust-row">
              {["4+ years trusted service", "Best price guidance", "Instant bookings", "Experienced guides"].map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
          <div className="hero-visual" aria-label="Dubai travel services preview">
            <img src="https://neontourism.com/wp-content/uploads/2024/11/listing-6.jpg" alt="Luxury destination coastline promoted by Neon Tourism" />
            <div className="floating-panel top-panel">
              <Bot size={20} />
              <span>RAG assistant searched 10 service records</span>
            </div>
            <div className="floating-panel bottom-panel">
              <BarChart3 size={20} />
              <span>CRM pipeline live: {leads.length} active leads</span>
            </div>
          </div>
        </section>

        <section className="section intro-grid" id="about">
          <div>
            <p className="eyebrow">Welcome to Neon Tourism</p>
            <h2>Discover the world, one place at a time.</h2>
          </div>
          <p>
            Neon Tourism plans cost-effective, comfortable, and memorable journeys across the globe, with tailored packages for individuals and groups, luxury cars with courteous drivers, city tours, day trips, attraction tickets, and custom travel support.
          </p>
        </section>

        <section id="services" className="section">
          <div className="section-heading">
            <p className="eyebrow">What do we offer?</p>
            <h2>Every public service rebuilt as a premium booking path.</h2>
          </div>
          <div className="service-grid">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <button key={service.title} onClick={() => setActiveService(service.title)} className={`service-card ${activeService === service.title ? "active" : ""}`}>
                  <Icon size={24} />
                  <strong>{service.title}</strong>
                  <span>{service.summary}</span>
                </button>
              );
            })}
          </div>
          <div className="knowledge-card">
            <div>
              <p className="eyebrow">Knowledge base answer</p>
              <h3>{selectedService.title}</h3>
              <p>{selectedService.summary}</p>
            </div>
            <div className="detail-grid">
              <InfoBlock title="Destinations" value={selectedService.destinations.join(", ")} />
              <InfoBlock title="Price Range" value={selectedService.price} />
              <InfoBlock title="Processing" value={selectedService.processing} />
              <InfoBlock title="Required Details" value={selectedService.documents.join(", ")} />
            </div>
          </div>
        </section>

        <section id="ai-agent" className="section split">
          <div>
            <p className="eyebrow">Human-like WhatsApp AI</p>
            <h2>Answers from company knowledge, then captures the lead one question at a time.</h2>
            <p>
              The assistant recognizes greeting intents, shows a service menu, searches the Neon service base before answering, validates quote requests, logs conversation history, and transfers unknown questions to a human consultant.
            </p>
            <div className="mini-list">
              {["Interactive service menu", "RAG-style service matching", "Duplicate-aware CRM updates", "Human handoff for unavailable information"].map((item) => (
                <span key={item}><Check size={16} /> {item}</span>
              ))}
            </div>
          </div>
          <ChatPanel messages={messages} input={input} setInput={setInput} sendMessage={sendMessage} />
        </section>

        <section id="booking" className="section split">
          <div>
            <p className="eyebrow">Booking and quotation system</p>
            <h2>Create a validated CRM lead and trigger the automation flow.</h2>
            <p>
              Submitting this form creates or updates a customer profile, assigns a lead ID, logs the source, queues confirmations, schedules follow-up, and places the lead in the sales pipeline.
            </p>
          </div>
          <form className="lead-form" onSubmit={(event) => { event.preventDefault(); addLead(); }}>
            {[
              ["name", "Full Name"],
              ["phone", "Mobile Number"],
              ["whatsapp", "WhatsApp Number"],
              ["email", "Email Address"],
              ["nationality", "Nationality"],
              ["residence", "Country of Residence"],
              ["destination", "Destination"],
              ["travelDate", "Travel Date"],
              ["returnDate", "Return Date"],
              ["adults", "Adults"],
              ["children", "Children"],
              ["hotel", "Preferred Hotel Category"],
              ["budget", "Budget"]
            ].map(([key, label]) => (
              <label key={key}>
                <span>{label}</span>
                <input
                  type={key.toLowerCase().includes("date") ? "date" : key === "email" ? "email" : "text"}
                  value={leadForm[key as keyof typeof leadForm]}
                  onChange={(event) => setLeadForm((current) => ({ ...current, [key]: event.target.value }))}
                />
              </label>
            ))}
            <label>
              <span>Interested Service</span>
              <select value={leadForm.service} onChange={(event) => setLeadForm((current) => ({ ...current, service: event.target.value }))}>
                {services.map((service) => <option key={service.title}>{service.title}</option>)}
              </select>
            </label>
            <Button type="submit"><Plus size={16} /> Generate Quotation Request</Button>
          </form>
        </section>

        <section id="crm" className="section">
          <div className="section-heading">
            <p className="eyebrow">CRM and global search</p>
            <h2>Customer profiles, messages, notes, statuses, and bookings in one operating view.</h2>
          </div>
          <div className="search-bar">
            <Search size={18} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search customers, leads, bookings, packages, countries, services, messages, and notes" />
          </div>
          <div className="crm-table">
            {filteredLeads.map((lead) => (
              <article key={lead.id}>
                <div>
                  <strong>{lead.name}</strong>
                  <span>{lead.id} / {lead.service} / {lead.destination}</span>
                </div>
                <div>{lead.phone}</div>
                <div>{lead.budget}</div>
                <select value={lead.status} onChange={(event) => moveLead(lead.id, event.target.value)} aria-label={`Update status for ${lead.name}`}>
                  {stages.map((stage) => <option key={stage}>{stage}</option>)}
                </select>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <p className="eyebrow">Sales pipeline</p>
            <h2>Kanban pipeline with drag-style stage controls.</h2>
          </div>
          <div className="kanban">
            {stages.map((stage) => (
              <div key={stage} className="kanban-column">
                <h3>{stage}</h3>
                {leads.filter((lead) => lead.status === stage).map((lead) => (
                  <article key={lead.id} draggable onDragEnd={() => moveLead(lead.id, stage)}>
                    <strong>{lead.name}</strong>
                    <span>{lead.service}</span>
                    <small>{lead.destination} / {lead.priority}</small>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section id="dashboard" className="section">
          <div className="section-heading">
            <p className="eyebrow">Sales analytics dashboard</p>
            <h2>Live operational metrics for travel sales teams.</h2>
          </div>
          <div className="stats-grid">
            {stats.map(([label, value, Icon]) => (
              <article key={label as string}>
                <Icon size={22} />
                <span>{label as string}</span>
                <strong>{value as string}</strong>
              </article>
            ))}
          </div>
          <div className="analytics-grid">
            <ChartCard title="Popular Services" items={services.slice(0, 6).map((service, index) => [service.title, 92 - index * 9])} />
            <ChartCard title="Lead Sources" items={[["WhatsApp", 74], ["Website", 58], ["Instagram", 44], ["Referral", 31]]} />
            <div className="admin-card">
              <LockKeyhole size={22} />
              <h3>Admin Panel</h3>
              <p>Role-based sections for Admin, Sales Manager, and Sales Executive.</p>
              <div className="mini-list compact">
                {["Manage users", "Manage services", "Packages and prices", "FAQs and promotions", "Knowledge uploads", "WhatsApp templates"].map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>Talk to NEON TOURISM FZE.</h2>
            <p>Founder and CEO: Sushil Agrawal</p>
          </div>
          <div className="contact-grid">
            <a href="tel:+971557529042"><MessageCircle size={18} /> +971 557529042</a>
            <a href="mailto:sushil@neontourism.com"><Mail size={18} /> sushil@neontourism.com</a>
            <a href="mailto:agrawal.sushil55@gmail.com"><Mail size={18} /> agrawal.sushil55@gmail.com</a>
            <a href="https://www.instagram.com/neon.tourism"><Globe2 size={18} /> Instagram</a>
            <span><MapPin size={18} /> Dubai, UAE</span>
            <span><Building2 size={18} /> NEON TOURISM FZE</span>
          </div>
        </section>
      </div>

      <button className="whatsapp-float" onClick={() => setChatOpen(true)} aria-label="Open WhatsApp AI sales agent">
        <MessageCircle size={22} />
      </button>

      {chatOpen && (
        <div className="chat-drawer" role="dialog" aria-modal="true" aria-label="WhatsApp AI sales agent">
          <button className="close-chat" onClick={() => setChatOpen(false)} aria-label="Close WhatsApp AI sales agent"><X size={18} /></button>
          <ChatPanel messages={messages} input={input} setInput={setInput} sendMessage={sendMessage} compact />
        </div>
      )}
    </main>
  );
}

function InfoBlock({ title, value }: { title: string; value: string }) {
  return (
    <div className="info-block">
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ChatPanel({
  messages,
  input,
  setInput,
  sendMessage,
  compact = false
}: {
  messages: Message[];
  input: string;
  setInput: (value: string) => void;
  sendMessage: (message?: string) => void;
  compact?: boolean;
}) {
  return (
    <div className={`chat-panel ${compact ? "compact-chat" : ""}`}>
      <div className="chat-header">
        <Bot size={22} />
        <div>
          <strong>Neon AI Travel Consultant</strong>
          <span>Knowledge-grounded WhatsApp flow</span>
        </div>
      </div>
      <div className="message-list">
        {messages.map((message, index) => (
          <p key={`${message.role}-${index}`} className={message.role}>{message.text}</p>
        ))}
      </div>
      <div className="service-menu">
        {services.slice(0, 8).map((service) => (
          <button key={service.title} onClick={() => sendMessage(service.title)}>{service.title}</button>
        ))}
      </div>
      <form onSubmit={(event) => { event.preventDefault(); sendMessage(); }} className="chat-input">
        <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about visas, safaris, yachts, tickets..." />
        <button aria-label="Send message"><Send size={16} /></button>
      </form>
    </div>
  );
}

function ChartCard({ title, items }: { title: string; items: (string | number)[][] }) {
  return (
    <article className="chart-card">
      <h3>{title}</h3>
      {items.map(([label, value]) => (
        <div key={label as string} className="bar-row">
          <span>{label as string}</span>
          <div><i style={{ width: `${value}%` }} /></div>
          <strong>{value as number}%</strong>
        </div>
      ))}
    </article>
  );
}
