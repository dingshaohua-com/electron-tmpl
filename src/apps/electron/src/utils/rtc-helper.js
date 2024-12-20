const {
    createAgoraRtcEngine,
    ChannelProfileType,
    ClientRoleType,
    VideoSourceType,
    VideoViewSetupMode,
  } = require('agora-electron-sdk');
  
  // 填入你的 App ID
  const APPID = '422860c7ccc744b284943683959f4c38';
  // 填入你的临时 Token
  let token =
    '007eJxTYLhtdfp9xRldS56HIvqx/M3R7zInpjmZb33hX6cy92DrARYFBhMjIwszg2Tz5ORkcxOTJCMLE0sTYzMLY0tTyzSTZGOLH5OS0hsCGRmWFccwMTJAIIjPypCWWVRcwsAAABuwHrc=';
  // 填入生成 Token 时使用的频道名
  const channel = 'first';
  // 用户 ID，并确保其在频道内的唯一性
  let uid = 123;
  
  export const initRtc = () => {
    // 初始化 RtcEngine 实例
    const rtc = createAgoraRtcEngine();
    rtc.initialize({
      appId: APPID,
      logConfig: { filePath: '' },
    });
    return rtc;
  };
  
  export const joinChannel = (rtc) => {
    // 使用临时 Token 加入频道
    rtc.joinChannel(token, channel, uid, {
      // 设置频道场景为直播场景
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      // 设置用户角色为主播；如果要将用户角色设置为观众，保持默认值即可
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      // 发布麦克风采集的音频
      publishMicrophoneTrack: true,
      // 发布摄像头采集的视频
      publishCameraTrack: true,
      // 自动订阅所有音频流
      autoSubscribeAudio: true,
      // 自动订阅所有视频流
      autoSubscribeVideo: true,
    });
  };
  
  export const getEventHandles = (rtc) => {
    return {
      // 监听本地用户加入频道事件
      onJoinChannelSuccess: ({ channelId, localUid }, elapsed) => {
        console.log('成功加入频道：' + channelId);
        // 本地用户加入频道后，设置本地视频窗口
        rtc.setupLocalVideo({
          sourceType: VideoSourceType.VideoSourceCameraPrimary,
          uid: uid,
          view: document.querySelector('#join-channel-local-video'),
          setupMode: VideoViewSetupMode.VideoViewSetupAdd,
        });
      },
  
      // 监听远端用户加入频道事件
      onUserJoined: ({ channelId, localUid }, remoteUid, elapsed) => {
        console.log('远端用户 ' + remoteUid + ' 已加入');
        // 远端用户加入频道后，设置远端视频窗口
        rtc.setupRemoteVideo(
          {
            sourceType: VideoSourceType.VideoSourceRemote,
            uid: remoteUid,
            view: document.querySelector('#join-channel-remote-video'),
            setupMode: VideoViewSetupMode.VideoViewSetupAdd,
          },
          { channelId },
        );
      },
  
      // 监听用户离开频道事件
      onUserOffline: ({ channelId, localUid }, remoteUid, reason) => {
        console.log('远端用户 ' + remoteUid + ' 已离开频道');
        // 远端用户离开频道后，关闭远端视频窗口
        rtc.setupRemoteVideo({
          sourceType: VideoSourceType.VideoSourceRemote,
          uid: remoteUid,
          view: document.querySelector('#join-channel-remote-video'),
          setupMode: VideoViewSetupMode.VideoViewSetupRemove,
        });
      },
    };
  };