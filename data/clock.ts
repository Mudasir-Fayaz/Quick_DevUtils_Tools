import { ToolCategory } from "@/types";
import { CountdownTimer, AlarmClock, TimezoneConverter, UnixTimestampConverter, TimeDifference, PomodoroTimer} from "@/components/tools/clock"
import { Stopwatch } from "../components/tools/clock";
const clockTools: ToolCategory = {
  name: "Clock Tools",
  icon: 'Timer',
  tools: [
    {
      name: "Pomodoro Timer",
      icon: 'Hourglass',
      description: "A productivity timer that helps you focus using the Pomodoro technique.",
      keywords: "pomodoro timer, focus timer, productivity timer, task timer, work session timer, break timer, time management tool",
      slug: "/tool/pomodoro-timer",
      component: PomodoroTimer
    },
    {
      name: "Countdown Timer",
      icon: 'Timer',
      description: "A customizable timer that counts down to any specified duration or event.",
      keywords: "countdown timer, countdown clock, timer app, event timer, countdown tool, custom timer, countdown utility",
      slug: "/tool/countdown-timer",
      component: CountdownTimer
    },
    {
      name: "Stopwatch",
      icon: 'Timer',
      description: "A simple and efficient stopwatch to measure elapsed time for any activity.",
      keywords: "stopwatch, online stopwatch, timer, time tracker, event timing, activity timing, stopwatch utility",
      slug: "/tool/stopwatch",
      component: Stopwatch
    },
    {
      name: "Alarm Clock",
      icon: 'AlarmClockPlus',
      description: "An online alarm clock to set alerts for specific times with custom sounds.",
      keywords: "alarm clock, online alarm clock, set alarm, digital alarm, alarm app, wake-up timer, reminder clock",
      slug: "/tool/alarm-clock",
      component: AlarmClock
    },
    {
      name: "Time Zone Converter",
      icon: 'Calendar',
      description: "Easily convert time between multiple time zones to plan events or meetings.",
      keywords: "time zone converter, timezone clock, convert time, world clock, time converter, global time, timezone tool",
      slug: "/tool/time-zone-converter",
      component: TimezoneConverter
    },
    {
      name: "Unix Timestamp Converter",
      icon: 'Calendar',
      description: "Converts Unix timestamps to human-readable date and time formats, and vice versa.",
      keywords: "Unix timestamp converter, timestamp to date, Unix time tool, convert Unix time, epoch time converter, Unix time utility",
      slug: "/tool/unix-timestamp-converter",
      component: UnixTimestampConverter
    },
    {
      name: "Time Difference Calculator",
      icon: 'Diff',
      description: "Calculate the precise time difference between two dates or times.",
      keywords: "time difference calculator, calculate time difference, time calculator, date difference tool, duration calculator, time interval, time gap calculator",
      slug: "/tool/time-difference-calculator",
      component: TimeDifference
    }
  ]
}

  export default clockTools;
