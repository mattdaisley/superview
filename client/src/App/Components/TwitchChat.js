import React from 'react';

class TwitchChat extends React.Component {
  
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const opts = {
      height: '100%',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters 
        autoplay: 1
      }
    };

    let {id} = this.props;

    return (

      <iframe frameBorder="0"
        scrolling="yes"
        id={id}
        title={id}
        src={'http://www.twitch.tv/'+id+'/chat'}
        height={opts.height}
        width={opts.width}>
      </iframe>
    );
  }
}

export default TwitchChat;
