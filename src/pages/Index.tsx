import { useState } from "react";
import VapeSelector from "@/components/VapeSelector";
import VapeDisplay from "@/components/VapeDisplay";

type VapeItem = {
  id: number;
  imageUrl: string;
  name: string;
};

const Index = () => {
  const [selectedVape, setSelectedVape] = useState<VapeItem | null>(null);

  const handleSelectVape = (vape: VapeItem) => {
    setSelectedVape(vape);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-center">Симулятор Вейпа</h1>
      </header>
      
      {/* Main content */}
      <main className="flex-1 flex items-center justify-center relative p-4">
        <VapeDisplay selectedVape={selectedVape} />
      </main>
      
      {/* Vape selector */}
      <VapeSelector onSelectVape={handleSelectVape} />
    </div>
  );
};

export default Index;
