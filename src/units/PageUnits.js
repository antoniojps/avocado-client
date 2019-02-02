import React, { Component } from 'react'
import { BasePage } from 'ui'
import { Button } from 'elements'
import withUnits from './withUnits';
import ListUnits from './ListUnits';
import withFeedback from './withFeedback';

const List = withFeedback(ListUnits);

class PageUnits extends Component {
  componentDidMount() {
    const { getUnits } = this.props;
    getUnits({ page: 1 });
  }

  handleClick = () => alert('add unit')

  render() {
    return (
      <BasePage
        page={{
          title: 'Units',
        }}
        sideHeader={(
          <Button modifiers={['primary']} onClick={this.handleClick}>Add unit</Button>
        )}
      >
        <List {...this.props} />
      </BasePage>
    )
  }


  //   const {
  //     list, isloading, hasMore, error,
  //   } = this.props;
  //   if (error) return 'something went wrong';
  //   if (isloading) return 'loading';


  //   return (
  //     <div>HELLO</div>
  //     // <InfiniteScroll
  //     //   pageStart={0}
  //     //   loadMore={loadFunc}
  //     //   hasMore={true || false}
  //     //   loader={<div className="loader" key={0}>Loading ...</div>}
  //     // >
  //     //   {items}
  //     // </InfiniteScroll>
  //   )
  // }
}
export default withUnits(PageUnits)


// import React, { Component } from 'react'
// import { BasePage } from 'ui'
// import { Title, P, Button } from 'elements'

// export default class PageResources extends Component {
//   handleClick = () => alert('add resource')

//   render() {
//     return (
//       <BasePage
//         page={{
//           title: 'Resources',
//         }}
//         sideHeader={(
//           <Button modifiers={['primary']} onClick={this.handleClick}>Add resource</Button>
//         )}
//       >
//         <Title>
//           Recursos humanos
//         </Title>
//         <P>Recursos humanos teste</P>
//       </BasePage>
//     )
//   }
// }
