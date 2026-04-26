# Data Model

## ChildProfile

- id
- name_or_nickname
- birth_year
- grade_level
- location_context
- primary_language
- secondary_language
- learning_pathway: vietnam_public | bilingual | cambridge | ib | us_ap | custom
- parent_ids
- safety_level
- interests
- strengths
- challenges
- created_at
- updated_at

## ParentProfile

- id
- name
- role: father | mother | guardian
- notification_preferences
- co_learning_time_available
- values_preferences

## Competency

- id
- domain
- subject
- age_band
- grade_band
- title
- description
- prerequisites
- evidence_required

## MasteryState

- child_id
- competency_id
- state
- mastery_score
- retention_score
- transfer_score
- last_attempt_at
- next_review_at
- evidence_count

## Lesson

- id
- subject
- age_band
- competency_ids
- title
- objective
- content_blocks
- exercises
- rubric

## Attempt

- id
- child_id
- lesson_id
- competency_id
- exercise_id
- answer
- is_correct
- error_type
- hint_level_used
- time_spent_seconds
- confidence_self_rating
- ai_role_used
- created_at

## Mistake

- id
- child_id
- competency_id
- attempt_id
- error_type: concept | procedure | calculation | reading | vocabulary | attention | strategy | unknown
- explanation
- correction_plan
- review_schedule
- resolved_at

## ReviewSchedule

- id
- child_id
- item_type: competency | flashcard | mistake | reading_vocab
- item_id
- scheduled_at
- interval_days
- ease_factor
- last_result

## Reflection

- id
- child_id
- session_id
- prompt
- response_text
- response_audio_url
- mood
- energy_level
- created_at

## PortfolioItem

- id
- child_id
- type: writing | project | code | science | reading | presentation | art | life_skill
- title
- description
- file_urls
- linked_competencies
- parent_comment
- child_reflection
- created_at

## ParentObservation

- id
- parent_id
- child_id
- observation_type
- note
- linked_session_id
- created_at

## AIInteractionLog

- id
- child_id
- session_id
- role: tutor | classmate | opponent | coach | examiner | librarian | project_mentor | parent_assistant | safety_guardian
- subject
- age_band
- support_level: none | hint_light | hint_medium | worked_example | explanation | feedback
- safety_flags
- response_quality_score
- created_at

## SafetyEvent

- id
- child_id
- event_type
- severity: low | medium | high | urgent
- trigger_summary
- action_taken
- parent_notified
- created_at

## LearningEvent

Use append-only events for analytics:

- SESSION_STARTED
- QUESTION_ATTEMPTED
- HINT_USED
- MISTAKE_CLASSIFIED
- MASTERY_UPDATED
- REVIEW_SCHEDULED
- REFLECTION_SUBMITTED
- PORTFOLIO_ITEM_CREATED
- PARENT_MISSION_COMPLETED
- SAFETY_EVENT_CREATED

## Adaptive acceleration entities

### LearningLevel

- id
- domain
- level_code
- title
- prerequisites
- concept_description
- cognitive_demand_rating
- emotional_demand_rating
- content_safety_rating
- age_ui_min
- parent_approval_required
- mastery_criteria
- transfer_tasks
- enrichment_tasks

### SkillState

- id
- child_id
- skill_id
- current_level
- recommended_next_level
- exposure_count
- independent_accuracy
- guided_accuracy
- hint_dependency
- average_response_latency
- explanation_quality
- retention_score
- transfer_score
- challenge_fit_score
- learning_velocity
- frustration_signal
- boredom_signal
- parent_observation_score
- acceleration_status
- last_mastery_check_at
- next_review_at

### AccelerationRecommendation

- id
- child_id
- domain
- skill_cluster
- recommendation_type: compact | enrich | accelerate | consolidate | scaffold
- evidence_summary
- risk_notes
- parent_action
- status: proposed | accepted | dismissed | paused
- created_at

### AsynchronousProfileSnapshot

- id
- child_id
- snapshot_date
- domain_levels_json
- strengths
- typical_areas
- support_areas
- underchallenge_risks
- overchallenge_risks
- parent_notes

## Owner / Capital Allocator / Rule-Shaper entities

### AgencyCapabilityState

- id
- child_id
- capability: bilingual_depth | data_probability | systems_policy_geopolitics | finance_accounting_assets | persuasion_leadership | ethics_pressure
- current_level
- readiness_score
- evidence_count
- explanation_quality
- transfer_score
- parent_observation_score
- last_activity_at
- next_recommended_activity_id

### DecisionJournalEntry

- id
- child_id
- decision_context
- options_considered
- predicted_outcomes
- chosen_option
- reasoning_text
- actual_outcome
- reflection_text
- parent_comment
- created_at
- reviewed_at

### CapitalAllocationSimulation

- id
- child_id
- scenario_type: allowance | family_project | mini_business | investment_simulation | charity | resource_budget
- starting_resources
- allocation_choices
- expected_return_or_value
- risk_notes
- outcome
- reflection
- created_at

### PitchPractice

- id
- child_id
- topic
- audience
- pitch_text_or_audio_url
- rubric_clarity
- rubric_evidence
- rubric_empathy
- rubric_integrity
- rubric_call_to_action
- ai_feedback
- parent_feedback
- created_at

### EthicsScenarioAttempt

- id
- child_id
- scenario_id
- pressure_type: peer | authority | time | money | status | ai_cheating | conflict_of_interest
- child_response
- reasoning
- ethical_risk_flags
- repair_action
- parent_review_required
- created_at
