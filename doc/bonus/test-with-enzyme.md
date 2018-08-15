# Test React Component using Jest + Enzyme

[Enzyme](http://airbnb.io/enzyme/) is a JavaScript Testing utility for React that makes it easier to assert, manipulate, and traverse your React Components' output.

To get started with enzyme, you can simply install it via npm. You will need to install enzyme along with an Adapter corresponding to the version of react (or other UI Component library) you are using. For instance, if you are using enzyme with React 16, you can run:

```
npm install --save enzyme enzyme-adapter-react-16
```

---

### Three ways of testing componnet

1. [Shallow Rendering](http://airbnb.io/enzyme/docs/api/shallow.html)

```js
import {shallow} from 'enzyme';

const wrapper = shallow(<MyComponent />);
```

2. [Full rendering](http://airbnb.io/enzyme/docs/api/mount.html)

```js
import {mount} from 'enzyme';

const wrapper = mount(<MyComponent />);
// ...
```

3. [Static Rendering](http://airbnb.io/enzyme/docs/api/render.html)

```js
import {render} from 'enzyme';

const wrapper = render(<MyComponent />);
```

More info about different render methods: https://gist.github.com/fokusferit/e4558d384e4e9cab95d04e5f35d4f913

---

### Example

#### Component

```js
import React, {Componet} from 'react';

class Foo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="foo">Bar</div>;
  }
}
export default Foo;
```

#### Test File

```js
import React from 'react';
import {shallow, mount, render} from 'enzyme';

import Foo from '../Foo';

describe('A suite', function() {
  it('should render without throwing an error', function() {
    expect(shallow(<Foo />).contains(<div className="foo">Bar</div>)).toBe(
      true,
    );
  });

  it('should be selectable by class "foo"', function() {
    expect(shallow(<Foo />).is('.foo')).toBe(true);
  });

  it('should mount in a full DOM', function() {
    expect(mount(<Foo />).find('.foo').length).toBe(1);
  });

  it('should render to static HTML', function() {
    expect(render(<Foo />).text()).toEqual('Bar');
  });
});
```
