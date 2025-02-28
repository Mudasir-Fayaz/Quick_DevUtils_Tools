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
      description: "A productivity timer that helps you focus using the Pomodoro technique. Work in timed intervals, typically 25 minutes, followed by short breaks. Boost efficiency and manage distractions effectively. Ideal for students, professionals, or anyone looking to improve focus. Track progress and achieve goals systematically.",
      keywords: "pomodoro timer, focus timer, productivity timer, task timer, work session timer, break timer, time management tool",
      slug: "/tool/pomodoro-timer",
      component: PomodoroTimer,
      faqs: [
        { question: "What is the Pomodoro technique?", answer: "The Pomodoro technique involves working in 25-minute intervals followed by 5-minute breaks to boost focus and productivity." },
        { question: "Can I customize the work and break durations?", answer: "Yes, you can adjust the durations to fit your personal preferences." },
        { question: "Does the tool provide notifications for breaks?", answer: "Yes, the timer sends alerts when it's time to take a break or start a work session." },
        { question: "Can I pause or reset the timer?", answer: "Yes, the timer can be paused or reset at any point during a session." },
        { question: "Is this timer suitable for group tasks?", answer: "Yes, it can be used for group tasks where everyone follows the same intervals." }
      ]
    },
    {
      name: "Countdown Timer",
      icon: 'Timer',
      description: "A customizable timer that counts down to any specified duration or event. Set timers for workouts, cooking, studying, or any other task. Provides visual and sound alerts when time is up. Easy to use and flexible for various scenarios. Ideal for time-sensitive activities or reminders.",
      keywords: "countdown timer, countdown clock, timer app, event timer, countdown tool, custom timer, countdown utility",
      slug: "/tool/countdown-timer",
      component: CountdownTimer,
      faqs: [
        { question: "How do I set a countdown timer?", answer: "Enter the desired duration or specific time and start the timer." },
        { question: "Can I use custom alarm sounds?", answer: "Yes, the tool allows you to choose or upload custom sounds for alerts." },
        { question: "Is the timer accurate to the second?", answer: "Yes, the timer provides precise countdown functionality." },
        { question: "Can I run multiple timers simultaneously?", answer: "Currently, the tool supports one timer at a time." },
        { question: "Will the timer work if I switch tabs?", answer: "Yes, the timer continues running even if you navigate away from the tab." }
      ]
    },
    {
      name: "Stopwatch",
      icon: 'Timer',
      description: "A simple and efficient stopwatch to measure elapsed time for any activity. Ideal for workouts, competitions, or tracking event durations. Features start, stop, and reset options for easy use. Provides precise timing to milliseconds for accurate measurements. Use it for personal or professional tasks.",
      keywords: "stopwatch, online stopwatch, timer, time tracker, event timing, activity timing, stopwatch utility",
      slug: "/tool/stopwatch",
      component: Stopwatch,
      faqs: [
        { question: "How do I use the stopwatch?", answer: "Click start to begin timing, stop to pause, and reset to clear the time." },
        { question: "Does the stopwatch have a lap timer?", answer: "Yes, the stopwatch includes a lap timer for tracking intervals." },
        { question: "Is the stopwatch accurate?", answer: "The stopwatch is highly accurate and measures time to milliseconds." },
        { question: "Can I save my stopwatch times?", answer: "Currently, the tool does not offer saving options for recorded times." },
        { question: "Does the stopwatch work offline?", answer: "Yes, as long as the tool is loaded, it works offline." }
      ]
    },
    {
      name: "Alarm Clock",
      icon: 'Bell',
      description: "An online alarm clock to set alerts for specific times with custom sounds. Use it to wake up, schedule reminders, or manage tasks. Easy-to-use interface with snooze functionality. Choose from built-in alarm sounds or upload your own. Perfect for time management and daily routines.",
      keywords: "alarm clock, online alarm clock, set alarm, digital alarm, alarm app, wake-up timer, reminder clock",
      slug: "/tool/alarm-clock",
      component: AlarmClock,
      faqs: [
        { question: "How do I set an alarm?", answer: "Choose a time, select a sound, and activate the alarm using the set button." },
        { question: "Can I customize the alarm sound?", answer: "Yes, you can upload custom sounds or choose from the provided options." },
        { question: "Will the alarm work if my device is in sleep mode?", answer: "No, the alarm requires the browser tab to remain active." },
        { question: "Can I set multiple alarms?", answer: "Currently, the tool supports one alarm at a time." },
        { question: "Does the alarm have a snooze option?", answer: "Yes, the tool provides a snooze option for added convenience." }
      ]
    },
    {
      name: "Time Zone Converter",
      icon: 'Calendar',
      description: "Easily convert time between multiple time zones to plan events or meetings. Enter the source and target time zones for instant conversions. Useful for global teams, travelers, and event planners. Displays accurate local times across regions. Includes daylight saving time adjustments for precision.",
      keywords: "time zone converter, timezone clock, convert time, world clock, time converter, global time, timezone tool",
      slug: "/tool/time-zone-converter",
      component: TimezoneConverter,
      faqs: [
        { question: "How do I use the time zone converter?", answer: "Enter the source time zone, target time zone, and time to get the conversion." },
        { question: "Does the tool account for daylight saving time?", answer: "Yes, the tool automatically adjusts for daylight saving time." },
        { question: "Can I convert multiple time zones at once?", answer: "Currently, the tool supports one-to-one time zone conversions." },
        { question: "Is the tool accurate for all regions?", answer: "Yes, it uses reliable data to ensure accurate time zone conversions." },
        { question: "Can I save commonly used time zones?", answer: "No, the tool does not have a save feature for time zones yet." }
      ]
    },
    {
      name: "Unix Timestamp Converter",
      icon: 'Calendar',
      description: "Converts Unix timestamps to human-readable date and time formats, and vice versa. Useful for developers and those working with time-based data. Supports various time zones and formats for versatility. Enter a timestamp or date to get the equivalent format. Perfect for debugging or formatting timestamps in applications.",
      keywords: "Unix timestamp converter, timestamp to date, Unix time tool, convert Unix time, epoch time converter, Unix time utility",
      slug: "/tool/unix-timestamp-converter",
      component: UnixTimestampConverter,
      faqs: [
        { question: "What is a Unix timestamp?", answer: "A Unix timestamp represents the number of seconds since January 1, 1970 (UTC)." },
        { question: "Can I convert a human-readable date to a Unix timestamp?", answer: "Yes, the tool allows bi-directional conversions between dates and timestamps." },
        { question: "Does the tool support time zones?", answer: "Yes, you can select a time zone for accurate conversions." },
        { question: "Is the timestamp accurate to milliseconds?", answer: "Yes, the tool supports millisecond precision." },
        { question: "Can I use this tool for batch conversions?", answer: "Currently, the tool processes one conversion at a time." }
      ]
    },
    {
      name: "Time Difference Calculator",
      icon: 'Diff',
      description: "Calculate the precise time difference between two dates or times. Enter start and end times to get the duration in days, hours, minutes, and seconds. Ideal for tracking project durations or planning schedules. Includes support for various time zones. Accurate and easy to use for any time gap calculation.",
      keywords: "time difference calculator, calculate time difference, time calculator, date difference tool, duration calculator, time interval, time gap calculator",
      slug: "/tool/time-difference-calculator",
      component: TimeDifference,
      faqs: [
        { question: "How do I calculate the time difference?", answer: "Enter the start and end dates or times to calculate the difference." },
        { question: "Can I calculate time differences in different time zones?", answer: "Yes, you can select different time zones for each date or time." },
        { question: "What units does the tool display the result in?", answer: "The result is displayed in days, hours, minutes, and seconds." },
        { question: "Does the tool handle leap years?", answer: "Yes, the tool accounts for leap years in its calculations." },
        { question: "Can I calculate the difference for future dates?", answer: "Yes, the tool supports time differences for both past and future dates." }
      ]
    }
  ]
  
}

  export default clockTools;
