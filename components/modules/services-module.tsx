"use client";

import React, { useState } from "react";
import { useERP } from "@/context/erp-context";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BookMarked, 
  Home, 
  Bus, 
  Search, 
  MapPin, 
  Check, 
  Users,
  Eye,
  CheckCircle
} from "lucide-react";

export default function ServicesModule() {
  const { books, setBooks, addToast } = useERP();
  const [activeSubTab, setActiveSubTab] = useState<"Library" | "Hostel" | "Transport">("Library");
  
  // Library State
  const [bookQuery, setBookQuery] = useState("");
  const filteredBooks = books.filter(b => b.title.toLowerCase().includes(bookQuery.toLowerCase()) || b.author.toLowerCase().includes(bookQuery.toLowerCase()));

  // Hostel State: visual Room Bed allocations
  const [hostelRooms, setHostelRooms] = useState([
    { roomNo: "101", type: "Double Sharing", beds: [{ bedId: "101A", occupant: "Ananya Sen", occupied: true }, { bedId: "101B", occupant: null, occupied: false }] },
    { roomNo: "102", type: "Double Sharing", beds: [{ bedId: "102A", occupant: "Rahul Verma", occupied: true }, { bedId: "102B", occupant: "Rajesh Sharma", occupied: true }] },
    { roomNo: "103", type: "Double Sharing", beds: [{ bedId: "103A", occupant: null, occupied: false }, { bedId: "103B", occupant: null, occupied: false }] }
  ]);

  // Transport State
  const [routes, setRoutes] = useState([
    { id: "R1", name: "Route 1 — Electronic City", busNo: "KA-01-F-4903", driver: "K. Murugan", active: true, stops: "8 Stops" },
    { id: "R2", name: "Route 2 — Whitefield Corridor", busNo: "KA-03-H-8022", driver: "Mohd. Rafiq", active: true, stops: "12 Stops" },
    { id: "R3", name: "Route 3 — Hebbal Expressway", busNo: "KA-51-M-1122", driver: "G. Singh", active: false, stops: "6 Stops" }
  ]);

  const handleBookCirculation = (id: string, action: "Issue" | "Return") => {
    setBooks(prev => prev.map(b => {
      if (b.id === id) {
        if (action === "Issue" && b.available > 0) {
          addToast(`Successfully issued: "${b.title}"`, "success");
          return { ...b, available: b.available - 1 };
        }
        if (action === "Return" && b.available < b.copies) {
          addToast(`Returned book copy: "${b.title}"`, "success");
          return { ...b, available: b.available + 1 };
        }
      }
      return b;
    }));
  };

  const handleBedAllocation = (roomIdx: number, bedIdx: number, bedId: string) => {
    const isOccupied = hostelRooms[roomIdx].beds[bedIdx].occupied;
    if (isOccupied) {
      // Release
      setHostelRooms(prev => {
        const copy = JSON.parse(JSON.stringify(prev));
        copy[roomIdx].beds[bedIdx].occupant = null;
        copy[roomIdx].beds[bedIdx].occupied = false;
        return copy;
      });
      addToast(`Released bed allocation: ${bedId}`, "warning");
    } else {
      // Allocate
      setHostelRooms(prev => {
        const copy = JSON.parse(JSON.stringify(prev));
        copy[roomIdx].beds[bedIdx].occupant = "Newly Onboarded";
        copy[roomIdx].beds[bedIdx].occupied = true;
        return copy;
      });
      addToast(`Allocated bed: ${bedId} to candidate`, "success");
    }
  };

  return (
    <div className="space-y-6">
      {/* Module Title */}
      <div>
        <h1 className="text-xl md:text-2xl font-extrabold text-text-primary tracking-tight">
          Campus Infrastructure Services
        </h1>
        <p className="text-xs md:text-sm text-text-secondary mt-1">
          Trace physical services including Library assets, Hostel occupancies, and transport routes.
        </p>
      </div>

      {/* Services Tabs Selector */}
      <div className="flex border-b border-border-base text-xs font-semibold select-none">
        <button
          onClick={() => setActiveSubTab("Library")}
          className={`flex items-center justify-center space-x-2 py-3 px-6 border-b-2 transition-colors cursor-pointer ${
            activeSubTab === "Library" 
              ? "border-primary-blue text-primary-blue font-bold" 
              : "border-transparent text-text-muted hover:text-text-primary"
          }`}
        >
          <BookMarked className="h-4 w-4" />
          <span>Library Directory</span>
        </button>
        <button
          onClick={() => setActiveSubTab("Hostel")}
          className={`flex items-center justify-center space-x-2 py-3 px-6 border-b-2 transition-colors cursor-pointer ${
            activeSubTab === "Hostel" 
              ? "border-primary-blue text-primary-blue font-bold" 
              : "border-transparent text-text-muted hover:text-text-primary"
          }`}
        >
          <Home className="h-4 w-4" />
          <span>Hostel Allocations</span>
        </button>
        <button
          onClick={() => setActiveSubTab("Transport")}
          className={`flex items-center justify-center space-x-2 py-3 px-6 border-b-2 transition-colors cursor-pointer ${
            activeSubTab === "Transport" 
              ? "border-primary-blue text-primary-blue font-bold" 
              : "border-transparent text-text-muted hover:text-text-primary"
          }`}
        >
          <Bus className="h-4 w-4" />
          <span>Transport Routes</span>
        </button>
      </div>

      {/* Library Sub-Module View */}
      {activeSubTab === "Library" && (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="relative flex-1">
                <Input
                  placeholder="Search library catalog by book title or author..."
                  value={bookQuery}
                  onChange={(e) => setBookQuery(e.target.value)}
                  leftIcon={<Search className="h-4 w-4 text-text-muted" />}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead className="bg-slate-50 border-b border-border-base text-text-secondary font-bold uppercase tracking-wider select-none">
                    <tr>
                      <th className="p-4">Book Title</th>
                      <th className="p-4">Author</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Total Copies</th>
                      <th className="p-4">Available Copies</th>
                      <th className="p-4 text-right">Circulation Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-base text-text-secondary font-medium">
                    {filteredBooks.map((book) => (
                      <tr key={book.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-semibold text-text-primary">{book.title}</td>
                        <td className="p-4">{book.author}</td>
                        <td className="p-4">{book.category}</td>
                        <td className="p-4">{book.copies}</td>
                        <td className="p-4 font-bold">
                          <span className={book.available > 0 ? "text-success" : "text-danger"}>
                            {book.available} / {book.copies}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-1">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleBookCirculation(book.id, "Return")}
                            disabled={book.available === book.copies}
                          >
                            Return
                          </Button>
                          <Button 
                            variant="primary" 
                            size="sm"
                            onClick={() => handleBookCirculation(book.id, "Issue")}
                            disabled={book.available === 0}
                          >
                            Issue
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Hostel Allocation Visual Board */}
      {activeSubTab === "Hostel" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hostelRooms.map((room, roomIdx) => (
            <Card key={room.roomNo}>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle className="text-sm">Room {room.roomNo}</CardTitle>
                  <span className="text-[10px] text-text-muted">{room.type}</span>
                </div>
                <Badge variant={room.beds.some(b => !b.occupied) ? "success" : "danger"}>
                  {room.beds.filter(b => !b.occupied).length} Bed Free
                </Badge>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {room.beds.map((bed, bedIdx) => (
                    <button
                      key={bed.bedId}
                      onClick={() => handleBedAllocation(roomIdx, bedIdx, bed.bedId)}
                      className={`p-4 rounded-xl border text-center transition-all cursor-pointer focus-ring flex flex-col items-center justify-center space-y-1.5 ${
                        bed.occupied 
                          ? "border-primary-blue bg-primary-blue-light/30" 
                          : "border-border-base hover:border-border-focus bg-slate-50/20"
                      }`}
                    >
                      <Home className={`h-6 w-6 ${bed.occupied ? "text-primary-blue" : "text-text-muted"}`} />
                      <span className="text-xs font-bold text-text-primary block">{bed.bedId}</span>
                      <span className="text-[9px] text-text-secondary truncate max-w-full">
                        {bed.occupant || "VACANT"}
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Transport Routes Tracking List */}
      {activeSubTab === "Transport" && (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border-base">
              {routes.map((route) => (
                <div key={route.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 text-text-secondary">
                      <Bus className="h-5 w-5" />
                    </div>
                    <div className="text-xs space-y-0.5">
                      <h4 className="text-sm font-bold text-text-primary">{route.name}</h4>
                      <p className="text-text-muted">Bus Number: {route.busNo} • Driver: {route.driver}</p>
                      <span className="text-[10px] text-text-secondary block font-semibold">{route.stops}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 select-none">
                    <Badge variant={route.active ? "success" : "outline"}>
                      {route.active ? "ON ROAD" : "DEPOT"}
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => addToast(`Opening tracker coordinates for ${route.busNo}`, "info")}
                    >
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      Track
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
