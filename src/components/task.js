import {getCorrectTime} from "../helpers";

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

export const createTaskTemplate = (task) => {
  const {description, dueDate, repeatingDays, tags, color, isFavorite, isArchive} = task;
  const {day, month, time} = dueDate ? getCorrectTime(dueDate) : {day: ``, month: ``, time: ``};
  const isDeadline = dueDate instanceof Date && dueDate < Date.now();
  const isRepeat = Object.values(repeatingDays).includes(true);
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
