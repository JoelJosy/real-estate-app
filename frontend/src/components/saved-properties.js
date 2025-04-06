import { mockProperties, mockUsers } from "@/lib/mock-data";
import PropertyCard from "@/components/property-card";

export default function SavedProperties({ userId }) {
  const user = mockUsers.find((u) => u.id === userId);

  if (!user) {
    return (
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <p className="text-center text-muted-foreground">User not found</p>
      </div>
    );
  }

  const savedProperties = mockProperties.filter((property) => user.savedProperties.includes(property.id));

  if (savedProperties.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-6 shadow-sm text-center">
        <h2 className="mb-2 text-xl font-bold">No Saved Properties</h2>
        <p className="mb-4 text-muted-foreground">
          You haven&apos;t saved any properties yet. Browse our listings and save properties you&apos;re interested in.
        </p>
        <a href="/properties" className="text-primary hover:underline">
          Browse Properties
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Saved Properties ({savedProperties.length})</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {savedProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
