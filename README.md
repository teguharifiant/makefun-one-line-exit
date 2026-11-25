# The One-Line Exit

[![Entry](https://make.fun/badge/u-kreutzx-the-one-line-exit-1dc652d1.svg)](https://make.fun/bounty/u-kreutzx-the-one-line-exit-1dc652d1?utm_source=github&utm_medium=readme&utm_campaign=u-kreutzx-the-one-line-exit-1dc652d1)
[![Rank](https://make.fun/badge/u-kreutzx-the-one-line-exit-1dc652d1/teguharifiant/makefun-one-line-exit/rank.svg)](https://make.fun/bounty/u-kreutzx-the-one-line-exit-1dc652d1/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-kreutzx-the-one-line-exit-1dc652d1)
[![Reward](https://make.fun/badge/u-kreutzx-the-one-line-exit-1dc652d1/teguharifiant/makefun-one-line-exit/reward.svg)](https://make.fun/bounty/u-kreutzx-the-one-line-exit-1dc652d1?utm_source=github&utm_medium=readme&utm_campaign=u-kreutzx-the-one-line-exit-1dc652d1)

## What this is

A resignation note from a helpdesk veteran, squeezed into a single sentence. The joke lands on the classic support-desk ritual — power-cycle the machine and hope for the best — except this time the machine is fine and the career is the thing that needs a fresh boot. Years of rebooting other people's computers, and the punchline is that the narrator finally reboots themself out the door.

> I hereby resign from IT support: I have turned it off and on again, and it turns out the thing that needed restarting was my career.

Length: 132 characters, counted by code points — comfortably inside the 1–140 window.

## Running it

You need Node.js 22 or newer. There is nothing to install.

```sh
node main.ts
```

That writes the entry to `/output/entry.txt`. Point it somewhere else with `MAKEFUN_OUTPUT_DIR`:

```sh
MAKEFUN_OUTPUT_DIR=./out node main.ts
```

Before anything is written, the script walks a small checklist of gates — length, printable ASCII only, exactly one line, no leading or trailing whitespace, and not blank — and stops with an error if any gate fails.

## Determinism

The entry is a hard-coded string, so the output never varies: two runs into two different folders produce byte-identical files, which `cmp` confirms.

## Built for make.fun

[Built for make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=u-kreutzx-the-one-line-exit-1dc652d1)
