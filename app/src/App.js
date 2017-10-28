import React from 'react';
import styled from 'styled-components';
import Meltstone from './Meltstone';
import ReactGA from 'react-ga';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { blocks: null };
  }

  componentWillMount() {
    Meltstone('content', 8).then(blocks => {
      this.setState({ blocks });
    });
  }

  componentDidMount() {
    ReactGA.initialize('UA-108723524-1');
    ReactGA.pageview('Landing Page');
    // ReactGA.ga('send', 'pageview', 'Landing Page');
  }

  render() {
    const { blocks } = this.state;

    return (
      <Wrapper>
        <Header>
          Meltstone<sup>JS</sup>
        </Header>
        <Content>
          {blocks &&
            blocks.length > 0 &&
            blocks.map((block, i) => (
              <Block key={i} dangerouslySetInnerHTML={{ __html: block }} />
            ))}
        </Content>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  line-height: 55px;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.9);
  color: #000;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28);
  font-size: 16pt;
  letter-spacing: 1px;

  sup {
    color: #ed4d06;
    font-size: 9pt;
    font-weight: 500;
    margin-left: 2px;
  }
`;

const Content = styled.div`
  margin: 60px 0;
  padding: 0;

  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`;

const Block = styled.div`
  display: inline-block;
  float: left;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  line-height: 1.2;
  width: 100%;

  p {
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;
    max-width: 700px;
  }

  p[small] {
    font-size: 9pt;
  }

  img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
  }

  a {
    display: inline-block;
    width: 100%;
    padding: 20px 10px;
    box-sizing: border-box;
    color: #fff;
    background-color: #ed4d06;
    border: 1px solid #ed4d06;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    @media (min-width: 768px) {
      width: auto;
      padding: 20px;

      &:hover {
        color: #ed4d06;
        background-color: #fff;
      }
    }
  }
`;

export default App;
