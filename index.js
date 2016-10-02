//import GoogleCalendar from './google_calendar'
import SpotifyWebHelper from '@jonny/spotify-web-helper';
const helper = SpotifyWebHelper()

const DELAY = 60*1000 // 1 minute check

const alarms = {
  morning: {
    time: {
      hours: 15,
      minutes: 29
    },
    song_uri: 'spotify:track:17i5jLpzndlQhbS4SrTd0B',
    message: 'Time to go up!'
  },
  time_to_leave: {
    time: {
      hours: 15,
      minutes: 31
    },
    song_uri: 'spotify:track:4uPNfksNb1K8OQuiEF6Z66',
    message: 'Time to go to work!'
  }
}

function checkIfTime(time){
  const now = new Date()
  if (now.getHours() === time.hours && now.getMinutes() === time.minutes) {
    return true
  }
  return false
}

function continuouslyCheckTime(alarm){
  if (checkIfTime(alarm.time)) {
    console.log(alarm.message)
    helper.player.play(alarm.song_uri) // start playing song
  }
  setTimeout(
    () => continuouslyCheckTime(alarm),
    DELAY) // check every minute
}

helper.player.on('ready', () => {
    Object.keys(alarms).map((alarmName) => {
      console.log("Queuing", alarmName);
      continuouslyCheckTime(alarms[alarmName])
    })
})
