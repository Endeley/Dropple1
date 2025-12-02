"use client";

import AssetCard from "./AssetCard";
import { useAssetsStore } from "@/stores/useAssetsStore";
import { insertAssetIntoCanvas } from "@/engines/assets/insertAssetIntoCanvas";

export default function AssetLibrary({ canvas }) {
  const assets = useAssetsStore((s) => s.assets);

  const handleDragStart = (id) => (ev) => {
    ev.dataTransfer.setData("assetId", id);
  };

  const handleClick = (id) => {
    const asset = assets[id];
    insertAssetIntoCanvas(canvas, asset);
  };

  return (
    <div className="w-64 bg-zinc-900 text-white p-4 overflow-y-auto h-full border-r border-zinc-700">
      <h2 className="text-lg font-bold mb-4">Assets</h2>

      <div className="grid grid-cols-1 gap-3">
        {Object.values(assets).map((asset) => (
          <AssetCard
            key={asset.id}
            asset={asset}
            onClick={() => handleClick(asset.id)}
            onDragStart={handleDragStart(asset.id)}
          />
        ))}
      </div>
    </div>
  );
}
