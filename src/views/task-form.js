import AbstractView from "./abstract";
import DAYS from "../data/days";
import COLORS from "../data/colors";

const createRepeatingDayTemplate = (day, repeatingDays, id) => {
  const isChecked = repeatingDays && repeatingDays[day];

  return (
    `<input
      class="visually-hidden card__repeat-day-input"
      type="checkbox"
      id="repeat-${day}-${id}"
      name="repeat"
      value="${day}"
      ${isChecked ? `checked` : ``}
    />
    <label class="card__repeat-day" for="repeat-${day}-${id}"
      >${day}</label
    >`
  );
};

const createTagTemplate = (tag) => {
  return (
    `<span class="card__hashtag-inner">
      <input
        type="hidden"
        name="hashtag"
        value="${tag}"
        class="card__hashtag-hidden-input"
      />
      <p class="card__hashtag-name">
        #${tag}
      </p>
      <button type="button" class="card__hashtag-delete">
        delete
      </button>
    </span>`
  );
};

const createColorTemplate = (color, checkedColor, id) => {
  const isChecked = color === checkedColor;

  return (
    `<input
      type="radio"
      id="color-${color}-${id}"
      class="card__color-input card__color-input--${color} visually-hidden"
      name="color"
      value="${color}"
      ${isChecked ? `checked` : ``}
    />
    <label
      for="color-${color}-${id}"
      class="card__color card__color--${color}"
      >${color}</label
    >`
  );
};

const createTaskFormTemplate = (task) => {
  const {id, description, repeatingDays, tags, color, correctTime, isDeadline, isDateShow, isRepeat} = task;
  const {day, month, time} = correctTime;

  const tagsTemplate = Array.from(tags).map((tag) => createTagTemplate(tag)).join(`\n`);
  const repeatingDaysTemplate = DAYS.map((constDay) => createRepeatingDayTemplate(constDay, repeatingDays, id)).join(`\n`);
  const colorsTemplate = COLORS.map((constColor) => createColorTemplate(constColor, color, id)).join(`\n`);

  const deadlineClass = isDeadline ? `card--deadline` : ``;
  const repeatClass = isRepeat ? `card--repeat` : ``;

  return (
    `<article class="card card--edit card--${color} ${deadlineClass} ${repeatClass}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${description}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${isDateShow ? `no` : `yes`}</span>
                </button>

                ${isDateShow ? `
                  <fieldset class="card__date-deadline">
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__date"
                        type="text"
                        placeholder=""
                        name="date"
                        value="${day} ${month} ${time}"
                      />
                    </label>
                  </fieldset>` : ``}

                <button class="card__repeat-toggle" type="button">
                  repeat: <span class="card__repeat-status">${isRepeat ? `yes` : `no`}</span>
                </button>

                ${isRepeat ? `
                  <fieldset class="card__repeat-days">
                    <div class="card__repeat-days-inner">
                      ${repeatingDaysTemplate}
                    </div>
                  </fieldset>` : ``}
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${tagsTemplate}
                </div>

                <label>
                  <input
                    type="text"
                    class="card__hashtag-input"
                    name="hashtag-input"
                    placeholder="Type new hashtag here"
                  />
                </label>
              </div>
            </div>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${colorsTemplate}
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`
  );
};

export default class TaskFormView extends AbstractView {
  constructor(task) {
    super();

    this._task = task;
  }

  getTemplate() {
    return createTaskFormTemplate(this._task);
  }

  setSubmitFormHandler(handler) {
    this.getElement()
      .querySelector(`.card__form`)
      .addEventListener(`submit`, handler);
  }
}
