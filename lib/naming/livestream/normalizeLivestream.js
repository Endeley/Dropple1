export function normalizeLivestream(data = {}) {
  return {
    run_of_show: Array.isArray(data.run_of_show) ? data.run_of_show : [],
    cta_blocks: Array.isArray(data.cta_blocks) ? data.cta_blocks : [],
    interaction_prompts: Array.isArray(data.interaction_prompts) ? data.interaction_prompts : [],
    technical_checklist: Array.isArray(data.technical_checklist) ? data.technical_checklist : [],
    sponsor_block: data.sponsor_block || "",
    closing_script: data.closing_script || "",
    scene_switch_list: Array.isArray(data.scene_switch_list) ? data.scene_switch_list : [],
  };
}
