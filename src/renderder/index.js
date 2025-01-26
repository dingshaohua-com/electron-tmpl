// rtc-helper.js
const {
  createAgoraRtcEngine,
  ChannelProfileType,
  ClientRoleType,
  VideoSourceType,
  VideoViewSetupMode,
} = require("agora-electron-sdk");

const APPID = "422860c7ccc744b284943683959f4c38"; // 填入你的 App ID
let token = "007eJxTYCgwsFFdry589M+VxUWTYtcqnDh+uS8+2cVeumJ6+d/aFfsVGEyMjCzMDJLNk5OTzU1MkowsTCxNjM0sjC1NLdNMko0tGF5PTW8IZGTYcSmciZEBAkF8Voa0zKLiEgYGAF08H88="; // 填入你的临时
const channel = "first"; // 填入生成 Token 时使用的频道名
let uid = 123; // 用户 ID，并确保其在频道内的唯一性

/**
 * 初始化rtc
 */
var initRtc = () => {
  const rtc = createAgoraRtcEngine();
  rtc.initialize({ appId: APPID, logConfig: { filePath: "" } });
  return rtc;
};

/**
 * 加入频道
 */
var joinChannel = (rtc) => {
  console.log("正在加入频道...", { token, channel, uid });
  rtc.joinChannel(token, channel, uid, {
    // 使用临时 Token 加入频道
    channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting, // 设置频道场景为直播场景
    clientRoleType: ClientRoleType.ClientRoleBroadcaster, // 设置用户角色为主播；如果要将用户角色设置为观众，保持默认值即可
    publishMicrophoneTrack: true, // 发布麦克风采集的音频
    publishCameraTrack: true, // 发布摄像头采集的视频
    autoSubscribeAudio: true, // 自动订阅所有音频流
    autoSubscribeVideo: true, // 自动订阅所有视频流
  });
};

/**
 * 监听一些rtc事件
 */
var getEventHandles = (rtc) => {
  return {
    // 监听本地用户加入频道事件
    onJoinChannelSuccess: ({ channelId, localUid }, elapsed) => {
      console.log("成功加入频道：" + channelId);
      rtc.setupLocalVideo({
        // 本地用户加入频道后，设置本地视频窗口
        sourceType: VideoSourceType.VideoSourceCameraPrimary,
        uid: uid,
        view: document.querySelector(".join-channel-local-video"),
        setupMode: VideoViewSetupMode.VideoViewSetupAdd,
      });
    },

    // 监听远端用户加入频道事件
    onUserJoined: ({ channelId, localUid }, remoteUid, elapsed) => {
      console.log("远端用户 " + remoteUid + " 已加入");
      rtc.setupRemoteVideo(
        {
          // 远端用户加入频道后，设置远端视频窗口
          sourceType: VideoSourceType.VideoSourceRemote,
          uid: remoteUid,
          view: document.querySelector(".join-channel-remote-video"),
          setupMode: VideoViewSetupMode.VideoViewSetupAdd,
        },
        { channelId }
      );
    },

    // 监听用户离开频道事件
    onUserOffline: ({ channelId, localUid }, remoteUid, reason) => {
      console.log("远端用户 " + remoteUid + " 已离开频道");
      rtc.setupRemoteVideo({
        // 远端用户离开频道后，关闭远端视频窗口
        sourceType: VideoSourceType.VideoSourceRemote,
        uid: remoteUid,
        view: document.querySelector("#join-channel-remote-video"),
        setupMode: VideoViewSetupMode.VideoViewSetupRemove,
      });
    },
  };
};
