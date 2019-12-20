import AbstractSmartView from "./abstract-smart";
import DAYS from "../data/days";
import COLORS from "../data/colors";

const createRepeatingDaysObj = (days) => {
  const repeatingDays = {};

  days.forEach((day) => {
    repeatingDays[day] = false;
  });

  return repeatingDays;
};

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

const createTaskFormTemplate = (task, options) => {
  const {id, description, tags, color, correctTime, isDeadline} = task;
  const {day, month, time} = correctTime;
  const {repeatingDaysOption, isDateShowOption, isRepeatOption} = options;

  const tagsTemplate = Array.from(tags).map((tag) => createTagTemplate(tag)).join(`\n`);
  const repeatingDaysTemplate = DAYS.map((constDay) => createRepeatingDayTemplate(constDay, repeatingDaysOption, id)).join(`\n`);
  const colorsTemplate = COLORS.map((constColor) => createColorTemplate(constColor, color, id)).join(`\n`);

  const deadlineClass = isDeadline ? `card--deadline` : ``;
  const repeatClass = isRepeatOption ? `card--repeat` : ``;

  const isBlockSaveButton = (isDateShowOption && isRepeatOption) ||
    (isRepeatOption && !Object.values(repeatingDaysOption).some(Boolean));

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
                  date: <span class="card__date-status">${isDateShowOption ? `yes` : `no`}</span>
                </button>

                ${isDateShowOption ? `
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
                  repeat: <span class="card__repeat-status">${isRepeatOption ? `yes` : `no`}</span>
                </button>

                ${isRepeatOption ? `
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
            <button class="card__save" type="submit"${isBlockSaveButton ? ` disabled` : ``}>save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`
  );
};

export default class TaskFormView extends AbstractSmartView {
  constructor(task) {
    super();

    this._task = task;
    this._options = {
      isDateShowOption: this._task.isDateShow,
      isRepeatOption: this._task.isRepeat,
      repeatingDaysOption: this._task.isRepeat ? Object.assign({}, this._task.repeatingDays) : createRepeatingDaysObj(DAYS)
    };
    this._subscribeOnEvents();
  }

  _onDeadlineToggleClick() {
    this.getElement()
      .querySelector(`.card__date-deadline-toggle`)
      .addEventListener(`click`, () => {
        this._options.isDateShowOption = !this._options.isDateShowOption;
        this.rerender();
      });
  }

  _onRepeatToggleClick() {
    this.getElement()
      .querySelector(`.card__repeat-toggle`)
      .addEventListener(`click`, () => {
        this._options.isRepeatOption = !this._options.isRepeatOption;
        this.rerender();
      });
  }

  _onRepeatDayChange() {
    const repeatDaysInputs = this.getElement()
      .querySelectorAll(`.card__repeat-day-input`);

    Array.from(repeatDaysInputs).forEach((input) => {
      input.addEventListener(`change`, (event) => {
        this._options.repeatingDaysOption[event.target.value] = event.target.checked;
        this.rerender();
      });
    });
  }

  _subscribeOnEvents() {
    this._onDeadlineToggleClick();
    this._onRepeatToggleClick();
    this._onRepeatDayChange();
  }

  getTemplate() {
    return createTaskFormTemplate(this._task, this._options);
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  setSubmitFormHandler(handler) {
    this.getElement()
      .querySelector(`.card__form`)
      .addEventListener(`submit`, handler);
  }
}
