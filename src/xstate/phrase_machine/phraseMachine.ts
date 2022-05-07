import { fsRecord } from "./phraseFirestoreRecord";
import { createMachine } from "xstate";
import type {
  PhraseMachineAction,
  PhraseMachineCtx,
} from "./phraseMachine.types";
import { actions } from "./phraseMachine.actions";
import { guards } from "./phraseMachine.guards";

export const phraseMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QAcAWAnAhrMB9AtpgMaoCWAdmAHQWkAuAxADIDyAggCK4CqAygKIAlRCgD2seqVHkRIAB6IALAHYANCACeiAEwBGAMxUAnCaOLtABiPaArADYL+-QF9n6tFhwFiZSjXL0DLLI4pLSsgoIuspGVIp2ABzK+nba+gkW8cqK6loI2sp2xqY2upaFli5uIB7YeIQkFNToYJgQGgy8ACpsgl24AIrcAJIAWsGhdFIySPKIpdpUidl2hTaZyTa5OsrKxSaK1oq6qcqu7hh13o1+yAA2mBoUUJ3cAEIAssP9bAByvAB1IQTCRTcKzSIxCxUNapOxGOw2Ez6HKaRC6BKLUxGGKpUoOXSKc41S5eBq+aiwVCiADuvAArkQiHBYAw5LA6Jg6NRMAAzbnoAAUvG4AGFRfxeLwAJQMWpknxNKhU2kMpkskFhGagSJlCwJKj6bQZOxOfRGfQWCx2bYIfS6XT7A66CyWbTE+X1RV+FU0gBimFIdzZHK5PP5YCFIvFkplctJXpulOp-sDd01YO1cyilgNRpNZotVptaPy0TipmSFjKBX0Ng9CeuFKoUFEXVEvzAckYGemEXRqUMqwxFVK+sStu0egrJhsinMKit2jsDc8iYpzHYXAACgAJQRsAS8XvgnWIIw2PYEmwJZGKOf221lVzVciiCBwYKN8lK2h0E9ZpENiGMkij6IUFjKGkSImLalo2E6Y7GreKRVBca5NkqLRtHkYign2EKIOkihUKU9gugkGRIiicEWAh2LJCkOLLgkaEkhhP63A8TzkFAAH9ggiKOpeGQJKkJz2iktH0ZWTjwlBiRsZ6mE+imarMrA8CzCE+GntmLq2DCji6AsUGYpOGQzgiawbHWRLVMpnHJrSAZBvxhFRHRsTUdkrFGISJZ5HojqHLOU4xEYGRKd+3rUK27adt27lnlE4EIWUhzZPq8ROAkk6Ek694JEVlTug5MVJsqKaCGAIToP+2mTARKUYvYMIouB-kusoBhbKWBRFKFOLVjYy7xAkq5XE5yXZmkT5WE6djmHOdirUYL7OEAA */
  createMachine<PhraseMachineCtx, PhraseMachineAction>(
    {
      context: {
        user_id: "",
        phrases: {},
        phraseIds: [],
        phraseIndex: 0,
        currentPhrase: null,
        currentPhraseId: "",
        answerText: "",
        answerStart: 0,
        answerDuration: 0,
        isCorrect: false,
      },
      id: "phrase_machine",
      initial: "init",
      on: {
        LOAD_PHRASES: {
          actions: "loadPhrases",
        },
      },
      states: {
        init: {
          always: {
            cond: "userLoaded",
            target: "ready",
          },
          on: {
            LOAD_USER: {
              actions: "loadUser",
            },
          },
        },
        ready: {
          on: {
            START_QUIZ: {
              actions: ["shuffle", "loadPhrase"],
              target: "playing",
            },
          },
        },
        playing: {
          on: {
            SUBMIT_ANSWER: [
              {
                actions: ["recordAnswer", "recordSuccess"],
                cond: "answerIsCorrect",
                target: "showSuccess",
              },
              {
                actions: [
                  "recordAnswer",
                  "recordFail",
                  "addPhraseToEndOfQueue",
                ],
                target: "showFail",
              },
            ],
          },
        },
        showSuccess: {
          invoke: {
            src: fsRecord,
            id: "fsRecord",
          },
          after: {
            SUCCESS: {
              target: "goToNext",
            },
          },
        },
        showFail: {
          invoke: {
            src: fsRecord,
            id: "fsRecord",
          },
          after: {
            SUCCESS: {
              target: "goToNext",
            },
          },
        },
        goToNext: {
          entry: ["incrementPhrase", "resetInfo", "loadPhrase"],
          always: [
            {
              cond: "phraseIsMissing",
              target: "showReport",
            },
            {
              target: "playing",
            },
          ],
        },
        showReport: {},
      },
    },
    {
      actions,
      guards,
      delays: {
        SUCCESS: 1000,
        FAIL: 2000,
      },
    }
  );

export type PhraseMachineType = typeof phraseMachine;

// play all phrases once
// if missed, mark as
