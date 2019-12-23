import AbstractView from "./abstract";

const createTagsTemplate = (tags) => {
  return Array.from(tags)
    .map((tag) => {
      return (
        `<span class="card__hashtag-inner">
          <span class="card__hashtag-name">
            #${tag}
          </span>
        </span>`
      );
    }).join(`\n`);
};

const createTaskTemplate = (task) => {
  const {description, tags, color, correctTime, isFavorite, isArchive, isDeadline, isRepeat} = task;
  const {day, month, time} = correctTime;

  const tagsTemplate = createTagsTemplate(tags);
  const deadlineClass = isDeadline ? `card--deadline` : ``;
  const repeatClass = isRepeat ? `card--repeat` : ``;
  const favoriteClass = isFavorite ? `card__btn--disabled` : ``;
  const archiveClass = isArchive ? `card__btn--disabled` : ``;
  return (
    `<article class="card card--${color} ${deadlineClass} ${repeatClass}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive ${archiveClass}">
              archive
            </button>
            <button
              type="button" class="card__btn card__btn--favorites ${favoriteClass}">
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${description}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${day} ${month}</span>
                    <span class="card__time">${time}</span>
                  </p>
                </div>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${tagsTemplate}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`
  );
};

export default class TaskView extends AbstractView {
  constructor(task) {
    super();

    this._task = task;
  }

  getTemplate() {
    return createTaskTemplate(this._task);
  }

  setClickEditButtonHandler(handler) {
    this.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, handler);
  }

  setClickArchiveButton(handler) {
    this.getElement()
      .querySelector(`.card__btn--archive`)
      .addEventListener(`click`, handler);
  }

  setClickFavoriteButton(handler) {
    this.getElement()
      .querySelector(`.card__btn--favorites`)
      .addEventListener(`click`, handler);
  }
}
