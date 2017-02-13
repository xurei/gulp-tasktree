# gulp-tasktree
Visualize your tasks dependencies extensively

## !!! Deprecated !!!
Use [gulp-task-graph-visualizer](https://www.npmjs.com/package/gulp-task-graph-visualizer) instead.

## Install
```bash
npm install gulp-tasktree --save-dev
```

## Usage

#### Getting started
In your gulpfile.js
```javascript
var tasktree = require('gulp-tasktree');
gulp.task('tasks', tasktree());
```

Then run it with
```bash
gulp tasks
```

Will give you something like this :
```bash

```

#### CLI options
- `--task=[task_name]` : Print only the tree starting from one task.
  By default, all the tasks are printed.
