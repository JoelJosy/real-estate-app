"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export default function AddPropertyForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    Title: "",
    Price: "",
    NoOfBedrooms: "",
    NoOfBathrooms: "",
    FloorArea: "",
    County: "",
    Area: "",
    DateOfConstruction: "NA",
    Features: "",
    PropertyType:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeatureToggle = (feature) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Property data:", formData);
    onSuccess();
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-6" id="add-prop-form">
      <div className="space-y-2">
        <Label htmlFor="title">Property Title</Label>
        <Input id="title" name="title" value={formData.Title} onChange={handleChange} placeholder="e.g., Modern Downtown Apartment" required />
      </div>

      {/* <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Describe your property..." rows={4} required />
      </div> */}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input id="price" name="price" type="number" value={formData.Price} onChange={handleChange} placeholder="e.g., 450000" required />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input id="bedrooms" name="bedrooms" type="number" value={formData.NoOfBedrooms} onChange={handleChange} placeholder="e.g., 2" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Input id="bathrooms" name="bathrooms" type="number" step="0.5" value={formData.NoOfBathrooms} onChange={handleChange} placeholder="e.g., 2" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="FloorArea">Floor Area</Label>
          <Input id="FloorArea" name="FloorArea" type="number" value={formData.FloorArea} onChange={handleChange} placeholder="e.g., 1200" required />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="area">Area</Label>
          <Input id="area" name="area" value={formData.Area} onChange={handleChange} placeholder="e.g., 123 Main St, New York, NY" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="county">County</Label>
          <Input id="county" name="county" value={formData.County} onChange={handleChange} placeholder="e.g., 123 Main St, New York, NY" required />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="PropertyType">Property Type</Label>
          <Input id="PropertyType" name="PropertyType" value={formData.PropertyType} onChange={handleChange} placeholder="e.g., Detached" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="yearBuilt">Date of Construction</Label>
          <Input id="yearBuilt" name="yearBuilt" type="number" value={formData.DateOfConstruction} onChange={handleChange} placeholder="e.g., 2018" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="features">Features</Label>
        <Input id="features" name="features" value={formData.Features} onChange={handleChange} placeholder="e.g., Seaside view, terrace" required />
      </div>

      <div className="space-y-2">
        <Label>Property Images</Label>
        <div className="rounded-lg border border-dashed border-input p-6 text-center">
          <p className="text-sm text-muted-foreground">Drag and drop your images here, or click to browse</p>
          <Input type="file" multiple className="mt-2" accept="image/*" />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onSuccess}>Cancel</Button>
        <Button type="submit">Add Property</Button>
      </div>
    </form>
  );
}