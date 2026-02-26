'use client'

import { useState, useEffect, useCallback } from 'react'

export type UserType = 'highschool' | 'university' | 'professional'

export interface CareerDecision {
  id: string
  title: string
  decision: 'saved' | 'disregarded'
}

export interface PipelineState {
  userType: UserType | null
  discover: {
    resumeUploaded: boolean
    transcriptUploaded: boolean
    linkedinConnected: boolean
    visiCompleted: boolean
    explorationMode: boolean
  }
  match: {
    decisions: CareerDecision[]
    selectedFocus: string | null
  }
  achieve: {
    started: boolean
  }
}

const DEFAULT_STATE: PipelineState = {
  userType: null,
  discover: {
    resumeUploaded: false,
    transcriptUploaded: false,
    linkedinConnected: false,
    visiCompleted: false,
    explorationMode: false,
  },
  match: {
    decisions: [],
    selectedFocus: null,
  },
  achieve: {
    started: false,
  },
}

const STORAGE_KEY = 'gigsup_pipeline_state'

function loadState(): PipelineState {
  if (typeof window === 'undefined') return DEFAULT_STATE
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_STATE
    return { ...DEFAULT_STATE, ...JSON.parse(raw) }
  } catch {
    return DEFAULT_STATE
  }
}

function saveState(state: PipelineState) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {}
}

export function usePipelineState() {
  const [state, setState] = useState<PipelineState>(DEFAULT_STATE)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setState(loadState())
    setMounted(true)
  }, [])

  const update = useCallback((updater: (prev: PipelineState) => PipelineState) => {
    setState(prev => {
      const next = updater(prev)
      saveState(next)
      return next
    })
  }, [])

  // Discover completeness
  const isDiscoverComplete = mounted && state.discover.visiCompleted && (
    state.discover.explorationMode ||
    state.discover.resumeUploaded ||
    state.discover.transcriptUploaded ||
    state.discover.linkedinConnected
  )

  // Unlock conditions
  const isMatchUnlocked = isDiscoverComplete
  const isAchieveUnlocked = mounted && state.match.selectedFocus !== null

  // Saved careers from match
  const savedCareers = state.match.decisions.filter(d => d.decision === 'saved')

  return {
    state,
    mounted,
    isDiscoverComplete,
    isMatchUnlocked,
    isAchieveUnlocked,
    savedCareers,

    // User type
    setUserType: (type: UserType) => update(s => ({ ...s, userType: type })),

    // Discover actions
    markResumeUploaded: () => update(s => ({ ...s, discover: { ...s.discover, resumeUploaded: true } })),
    markTranscriptUploaded: () => update(s => ({ ...s, discover: { ...s.discover, transcriptUploaded: true } })),
    markLinkedinConnected: () => update(s => ({ ...s, discover: { ...s.discover, linkedinConnected: true } })),
    markVisiCompleted: () => update(s => ({ ...s, discover: { ...s.discover, visiCompleted: true } })),
    enableExplorationMode: () => update(s => ({ ...s, discover: { ...s.discover, explorationMode: true } })),

    // Match actions
    recordDecision: (id: string, title: string, decision: 'saved' | 'disregarded') =>
      update(s => ({
        ...s,
        match: {
          ...s.match,
          decisions: [...s.match.decisions.filter(d => d.id !== id), { id, title, decision }],
        },
      })),
    selectFocus: (title: string) =>
      update(s => ({ ...s, match: { ...s.match, selectedFocus: title } })),

    // Achieve
    markAchieveStarted: () => update(s => ({ ...s, achieve: { ...s.achieve, started: true } })),

    // Reset
    resetPipeline: () => {
      setState(DEFAULT_STATE)
      saveState(DEFAULT_STATE)
    },
  }
}
