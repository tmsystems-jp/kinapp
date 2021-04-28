<template>
  <main>
    <article>
      <dl>
        <dt>
          <h3></h3>
        </dt>
        <dd>
          <div>
            <div data-func="radio-slider">
              <input type="radio" name="plans" id="late" checked="" />
              <label for="late">遅刻</label>
              <input type="radio" name="plans" id="leave-early" />
              <label for="leave-early">早帰り</label>
              <input type="radio" name="plans" id="recess" />
              <label for="recess">お休み</label>
            </div>
          </div>
        </dd>
        <dd>
          <div>
            <label>来る時間</label>
            <input type="time" name="example1" />
          </div>
        </dd>
        <dd>
          <div>
            <label>帰る時間</label>
            <input type="time" name="example2" />
          </div>
        </dd>
        <dd>
          <div>
            <label>メッセージ</label>
            <div data-func="textarea">
              <textarea name="example3"></textarea>
            </div>
          </div>
        </dd>
      </dl>
    </article>
  </main>
</template>
