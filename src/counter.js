import html from "./hyperlit.js";
import { Lens } from "./lens.js";

const inc = Lens.reducer((count) => count + 1);
const dec = Lens.reducer((count) => count - 1);

export const Counter = ({ value, state, lens }) => {
  return html` <div class="siimple-card siimple--width-25">
    <div class="siimple-card-header">${value.name}</div>
    <div class="siimple-card-body siimple--text-center ">
      <span class="siimple--text-bold ">${value.count}</span>
    </div>
    <div class="siimple-card-footer">
      <span class="siimple-btn" onclick=${inc(lens.field("count"))}>Inc</span>
      <span class="siimple-btn" onclick=${dec(lens.field("count"))}>Dec</span>
    </div>
  </div>`;
};

export const counterInit = name => ({ name: name, count: 0 });