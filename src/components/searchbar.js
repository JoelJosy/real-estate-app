import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function Searchbar() {
  return (
    <div className="w-full max-w-3xl rounded-lg bg-white p-4 shadow-lg">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <Input
          type="text"
          placeholder="City, neighborhood, or address"
          className="flex-1 rounded-md border border-input px-3 py-2.5 text-sm md:text-base"
        />
        <div className="flex gap-2">
          <select className="rounded-md border border-input bg-background px-3 py-2.5 text-sm md:text-base ring-offset-background">
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
          <Button className="flex items-center gap-2 px-4 py-2.5 text-sm md:text-base h-10 md:h-[42px]">
            <Search className="h-4 w-4 md:h-5 md:w-5" />
            Search
          </Button>
        </div>
      </div>
    </div>
  )
}