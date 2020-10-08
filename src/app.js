import { app } from "./hyperapp/hyperapp.js";
import html from "./hyperapp/hyperlit.js";
import { Lens } from "./lens.js";
import { counterInit, Counter } from "./counter.js";

const addCounter = (state) => ({
  next_counter_name: "",
  counts: state.counts.concat([counterInit(state.next_counter_name)])
});

const newName = Lens.field("next_counter_name").reducer(
  (_old_name, _state, event) => event.target.value
);

const initial_state = { next_counter_name: "", counts: [] };

const main = state => html`
  <main class="siimple-content siimple-content--small siimple--py-5">
    <div class="siimple-field">
      <div class="siimple-field-label">Add counter</div>
      <div class="siimple--display-flex">
        <input
          class="siimple-input siimple-input--fluid"
          type="text"
          oninput=${newName}
          placeholder="counter name"
          value="${state.next_counter_name}"
        />
        <span class="siimple-btn siimple--mx-2" onclick=${addCounter}>
          Add
        </span>
      </div>
    </div>
    <div class="siimple-field">
      <ul class="siimple-list">
        ${state.counts.map((count, i) =>
          Counter({ ...Lens.field("counts").array(i).props(state) })
        )}
      </ul>
    </div>
  </main>`;

export const run = (root) =>
  app({
    init: initial_state,
    view: main,
    node: root,
  });
