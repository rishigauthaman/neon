"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Bot,
  CheckCircle2,
  ChevronDown,
  LayoutDashboard,
  Mail,
  MessageCircle,
  Phone,
  Search,
  Send,
  User,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  status: string;
  source: string;
  createdAt: string;
};

type Message = {
  role: "bot" | "user";
  text: string;
};

const services = [
  "Visa Services",
  "Flight Booking",
  "Hotel Booking",
  "Holiday Packages",
  "Customized Tours",
  "City Tours",
  "Desert Safari",
  "Yacht Rental",
  "Airport Transfers",
  "Attractions & Tickets",
  "Corporate Travel"
];

const initialLeads: Lead[] = [
  {
    id: "NT-1001",
    name: "Aarav Mehta",
    phone: "+971501112233",
    email: "aarav@example.com",
    service: "Holiday Packages",
    status: "New Lead",
    source: "WhatsApp AI Bot",
    createdAt: "Today"
  },
  {
    id: "NT-1002",
    name: "Maya Thomas",
    phone: "+971557770001",
    email: "maya@example.com",
    service: "Desert Safari",
    status: "Contacted",
    source: "WhatsApp AI Bot",
    createdAt: "Today"
  }
];

const blankDraft = {
  service: services[0],
  name: "",
  phone: "",
  email: ""
};

function nextQuestion(draft: typeof blankDraft) {
  if (!draft.service) return "Please select the service you are interested in.";
  if (!draft.name) return "Great. May I have your full name?";
  if (!draft.phone) return "Thanks. What is your phone or WhatsApp number?";
  if (!draft.email) return "Perfect. What email address should we use for the quote?";
  return "";
}

function validPhone(phone: string) {
  return /^\+?[0-9\s-]{8,}$/.test(phone);
}

function validEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export default function Home() {
  const [activePage, setActivePage] = useState<"bot" | "crm" | "dashboard">("bot");
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [draft, setDraft] = useState(blankDraft);
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Welcome to NEON TOURISM FZE. Please select a service from the dropdown, then I will collect your details for our CRM."
    }
  ]);

  useEffect(() => {
    const saved = window.localStorage.getItem("neon-crm-leads");
    if (saved) setLeads(JSON.parse(saved));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("neon-crm-leads", JSON.stringify(leads));
  }, [leads]);

  const filteredLeads = useMemo(() => {
    const needle = query.toLowerCase();
    return leads.filter((lead) => Object.values(lead).join(" ").toLowerCase().includes(needle));
  }, [leads, query]);

  const dashboard = useMemo(() => {
    const today = leads.filter((lead) => lead.createdAt === "Today").length;
    const contacted = leads.filter((lead) => lead.status !== "New Lead").length;
    const conversion = Math.round((contacted / Math.max(leads.length, 1)) * 100);
    const serviceCounts = services
      .map((service) => ({
        service,
        count: leads.filter((lead) => lead.service === service).length
      }))
      .filter((item) => item.count > 0)
      .sort((a, b) => b.count - a.count);

    return { today, conversion, serviceCounts };
  }, [leads]);

  const saveLead = (finalDraft = draft) => {
    if (!validPhone(finalDraft.phone)) {
      setMessages((current) => [...current, { role: "bot", text: "Please enter a valid phone number with at least 8 digits." }]);
      return;
    }

    if (!validEmail(finalDraft.email)) {
      setMessages((current) => [...current, { role: "bot", text: "Please enter a valid email address." }]);
      return;
    }

    const duplicate = leads.find(
      (lead) => lead.phone === finalDraft.phone || lead.email.toLowerCase() === finalDraft.email.toLowerCase()
    );
    const lead: Lead = {
      id: duplicate?.id ?? `NT-${1001 + leads.length}`,
      name: finalDraft.name,
      phone: finalDraft.phone,
      email: finalDraft.email,
      service: finalDraft.service,
      status: duplicate?.status ?? "New Lead",
      source: "WhatsApp AI Bot",
      createdAt: "Today"
    };

    setLeads((current) => duplicate ? current.map((item) => (item.id === duplicate.id ? lead : item)) : [lead, ...current]);
    setDraft(blankDraft);
    setInput("");
    setMessages((current) => [
      ...current,
      {
        role: "bot",
        text: `Done. I saved ${lead.name} in CRM as ${lead.id} for ${lead.service}. Our team can now follow up on WhatsApp, phone, or email.`
      }
    ]);
  };

  const handleServiceChange = (service: string) => {
    const updated = { ...draft, service };
    setDraft(updated);
    setMessages((current) => [
      ...current,
      { role: "user", text: service },
      { role: "bot", text: nextQuestion(updated) }
    ]);
  };

  const sendMessage = () => {
    const value = input.trim();
    if (!value) return;

    const updated = { ...draft };
    let reply = "";

    if (!updated.name) {
      updated.name = value;
      reply = nextQuestion(updated);
    } else if (!updated.phone) {
      updated.phone = value;
      reply = validPhone(value) ? nextQuestion(updated) : "That phone number looks incomplete. Please enter it again.";
      if (!validPhone(value)) updated.phone = "";
    } else if (!updated.email) {
      updated.email = value;
      if (validEmail(value)) {
        setDraft(updated);
        setMessages((current) => [...current, { role: "user", text: value }]);
        saveLead(updated);
        return;
      }
      updated.email = "";
      reply = "That email address looks incomplete. Please enter it again.";
    } else {
      reply = "This lead is already complete. Select another service to create a new CRM lead.";
    }

    setDraft(updated);
    setMessages((current) => [...current, { role: "user", text: value }, { role: "bot", text: reply }]);
    setInput("");
  };

  return (
    <main className="app">
      <aside className="sidebar">
        <div className="brand">
          <span>N</span>
          <div>
            <strong>NEON TOURISM FZE</strong>
            <small>WhatsApp AI + CRM</small>
          </div>
        </div>
        <nav aria-label="Application pages">
          <button className={activePage === "bot" ? "active" : ""} onClick={() => setActivePage("bot")}>
            <MessageCircle size={18} /> WhatsApp AI Bot
          </button>
          <button className={activePage === "crm" ? "active" : ""} onClick={() => setActivePage("crm")}>
            <Users size={18} /> CRM
          </button>
          <button className={activePage === "dashboard" ? "active" : ""} onClick={() => setActivePage("dashboard")}>
            <LayoutDashboard size={18} /> Dashboard
          </button>
        </nav>
      </aside>

      <section className="content">
        {activePage === "bot" && (
          <div className="page-grid">
            <div>
              <p className="eyebrow">Page 1</p>
              <h1>WhatsApp AI Bot</h1>
              <p className="subtext">
                The bot asks for service, name, phone number, and email, then stores the lead in CRM.
              </p>
              <div className="lead-preview">
                <h2>Current Lead</h2>
                <Info icon={ChevronDown} label="Service" value={draft.service || "Not selected"} />
                <Info icon={User} label="Name" value={draft.name || "Waiting"} />
                <Info icon={Phone} label="Phone" value={draft.phone || "Waiting"} />
                <Info icon={Mail} label="Email" value={draft.email || "Waiting"} />
              </div>
            </div>

            <div className="phone-shell">
              <div className="phone-top">
                <Bot size={20} />
                <div>
                  <strong>Neon AI Travel Consultant</strong>
                  <small>Online</small>
                </div>
              </div>

              <label className="service-select">
                <span>Select Service</span>
                <select value={draft.service} onChange={(event) => handleServiceChange(event.target.value)}>
                  {services.map((service) => <option key={service}>{service}</option>)}
                </select>
              </label>

              <div className="messages">
                {messages.map((message, index) => (
                  <p key={`${message.role}-${index}`} className={message.role}>{message.text}</p>
                ))}
              </div>

              <form className="chat-input" onSubmit={(event) => { event.preventDefault(); sendMessage(); }}>
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder={nextQuestion(draft) || "Lead complete"}
                  aria-label="Reply to WhatsApp AI bot"
                />
                <button aria-label="Send"><Send size={17} /></button>
              </form>
            </div>
          </div>
        )}

        {activePage === "crm" && (
          <div>
            <p className="eyebrow">Page 2</p>
            <h1>CRM</h1>
            <p className="subtext">All leads collected by the WhatsApp AI Bot are stored here.</p>
            <div className="search">
              <Search size={18} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, phone, email, service, status" />
            </div>
            <div className="table">
              <div className="table-head">
                <span>Lead</span>
                <span>Contact</span>
                <span>Service</span>
                <span>Status</span>
              </div>
              {filteredLeads.map((lead) => (
                <article key={lead.id}>
                  <div>
                    <strong>{lead.name}</strong>
                    <small>{lead.id} / {lead.source}</small>
                  </div>
                  <div>
                    <span>{lead.phone}</span>
                    <small>{lead.email}</small>
                  </div>
                  <span>{lead.service}</span>
                  <select value={lead.status} onChange={(event) => setLeads((current) => current.map((item) => item.id === lead.id ? { ...item, status: event.target.value } : item))}>
                    {["New Lead", "Contacted", "Qualified", "Quotation Sent", "Booked", "Lost"].map((status) => <option key={status}>{status}</option>)}
                  </select>
                </article>
              ))}
            </div>
          </div>
        )}

        {activePage === "dashboard" && (
          <div>
            <p className="eyebrow">Page 3</p>
            <h1>Dashboard</h1>
            <p className="subtext">Simple sales overview from CRM data.</p>
            <div className="stats">
              <Stat icon={Users} label="Total Leads" value={leads.length.toString()} />
              <Stat icon={MessageCircle} label="Today's Leads" value={dashboard.today.toString()} />
              <Stat icon={BarChart3} label="Conversion" value={`${dashboard.conversion}%`} />
              <Stat icon={CheckCircle2} label="Contacted+" value={leads.filter((lead) => lead.status !== "New Lead").length.toString()} />
            </div>
            <div className="chart">
              <h2>Popular Services</h2>
              {(dashboard.serviceCounts.length ? dashboard.serviceCounts : [{ service: "No leads yet", count: 0 }]).map((item) => (
                <div key={item.service} className="bar">
                  <span>{item.service}</span>
                  <div><i style={{ width: `${Math.min(item.count * 28, 100)}%` }} /></div>
                  <strong>{item.count}</strong>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function Info({ icon: Icon, label, value }: { icon: typeof User; label: string; value: string }) {
  return (
    <div className="info">
      <Icon size={18} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: string }) {
  return (
    <article>
      <Icon size={22} />
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}
