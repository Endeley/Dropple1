"use client";

import MasterHeader from "./panels/master/MasterHeader";
import MasterStructurePanel from "./panels/master/MasterStructurePanel";
import VariantManagerPanel from "./panels/master/VariantManagerPanel";
import NestedMasterBreadcrumb from "./panels/NestedMasterBreadcrumb";

export default function MasterInspector({ master }) {
  if (!master) {
    return (
      <div className="w-full h-full flex items-center justify-center text-neutral-500 text-sm">
        Component not found
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 overflow-y-auto text-white">
      <MasterHeader master={master} />
      <NestedMasterBreadcrumb />
      <MasterStructurePanel master={master} />
      <VariantManagerPanel master={master} />
    </div>
  );
}
