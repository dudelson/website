---
title: "GSoC Update: Weeks 1 and 2"
tags: mirage ocaml unikernel gsoc
---

It's already week 3 of Google's Summer of Code! Time for an update on what I
accomplished in the first two weeks and what I'm looking to get done with the
rest of this week.
<!--more-->
In essence the past two weeks have been all about getting comfortable with the
project. This includes (in order from general to specific) OCaml, unikernels, the Mirage OS
project, and Irmin. Arguably all of this should have been done during the
community bonding period, and I definitely feel that since returning from my
study abroad I've been racing to make up for lost time in this regard.
Here's a list of the things I've been up to the past two weeks:

- I started reading about OCaml features that are still mysterious to me, but
  that I will need to contribute to Irmin effectively. These include:
  
    - **polymorphic variants** These are used all over the place in large OCaml
      codebases, and Irmin is no exception. I've been reading about them in RWO
      and have opened threads on
      [github](https://github.com/mirage/irmin/issues/415#issuecomment-304460556)
      and the
      [ocaml forum](https://discuss.ocaml.org/t/polymorphic-variants-and-module-signatures/302)
      to try and get a better grip on how they work.
    - **OOP** Understanding OOP in OCaml is crucial to
      understanding
      [ocaml-webmachine](https://github.com/inhabitedtype/ocaml-webmachine),
      which I plan to use to implement the
      REST API. I've been reading about these in RWO as well.
    - **GADTs** While definitely less common than polymorphic variants, these
      are also used in Irmin. The best
      [GADT tutorials](https://wiki.haskell.org/GADTs_for_dummies)
      I could find were written
      in Haskell, so I checked something off my personal programming TODO list
      and spent a few days during the first
      week [learning Haskell](http://learnyouahaskell.com/).
      Due to the large number of things I am trying to get familiar with in
      order to become an effective intern, I was not able to make as thorough a
      job of understanding Haskell as I would have liked (monads and transformer
      stacks are still mysterious), but now I understand enough to get the gist
      of the tutorials. (Update: I have since found a
      [great GADT tutorial in OCaml](http://mads-hartmann.com/ocaml/2015/01/05/gadt-ocaml.html).)

- I consumed a large amount of online content related to unikernels and Mirage OS. This helped
  me get a sense of where unikernel technology is (pretty new but already
  [really cool](https://mirage.io/blog/bitcoin-pinata-results)),
  how it's received by industry
  ([Docker seems interested](https://blog.docker.com/2016/01/unikernel/) (and I
  lerned that all of my mentors work for Docker)),
  and how far we have to go before unikernels are a mainstream technology
  (there's a lot to do!).
- I got some hands-on experience building and deploying unikernels by moving
  this site from github pages to a unikernel on AWS. This took _way longer_ than
  I thought it would, but I got an appreciation for the state of unikernel
  tooling (not great for people who aren't developers), and at the end of it I
  produced a [guide](https://davidudelson.com/blog/2017/06/13/aws-unikernel-guide/).
- Last week I went to an OCaml hacking event at MIT! I was only there for an
  hour but I got to meet some cool people. While travelling back from the
  hacking event, I missed Mirage's biweekly catchup (better luck next week).
- I opened an [issue](https://github.com/mirage/irmin/issues/451) about
  improving Irmin's documentation for beginners like myself. This is an effort I'm
  hoping to sustain in parallel with my actual GSoC project over the course of
  the summer.
      
My plan for the coming week is to get a handle on the OCaml language features I
listed above so I can write the first iteration of the framework for handling
REST API requests.
