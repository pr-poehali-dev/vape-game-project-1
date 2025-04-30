import { useState } from 'react';

type VapeItem = {
  id: number;
  imageUrl: string;
  name: string;
};

const vapes: VapeItem[] = [
  {
    id: 1,
    imageUrl: 'https://cdn.poehali.dev/files/f8db6cec-f65e-4bbe-9a79-b0158120d859.jpg',
    name: 'VOOPOO Black'
  },
  {
    id: 2,
    imageUrl: 'https://cdn.poehali.dev/files/e79ddf28-8266-41de-8f15-6a54b5dbfd6f.jpg',
    name: 'DRAG TURQUOISE'
  },
  {
    id: 3,
    imageUrl: 'https://cdn.poehali.dev/files/200585a3-10ef-4035-ae98-7bb142afbec4.jpg',
    name: 'DRAG GREY'
  }
];

interface VapeSelectorProps {
  onSelectVape: (vape: VapeItem) => void;
}

const VapeSelector = ({ onSelectVape }: VapeSelectorProps) => {
  return (
    <div className="vape-selector fixed bottom-0 left-0 w-full py-4 px-2">
      <div className="flex overflow-x-auto gap-4 pb-2 justify-center">
        {vapes.map((vape) => (
          <div 
            key={vape.id} 
            className="vape-selector-item flex-shrink-0 w-24 cursor-pointer"
            onClick={() => onSelectVape(vape)}
          >
            <div className="bg-gray-800 rounded-lg p-2 flex items-center justify-center h-32">
              <img 
                src={vape.imageUrl} 
                alt={vape.name}
                className="max-h-full max-w-full object-contain" 
              />
            </div>
            <p className="text-center text-sm mt-1 text-gray-300">{vape.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VapeSelector;
