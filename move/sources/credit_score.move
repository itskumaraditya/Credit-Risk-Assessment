module credit_risk::credit_score {
    use std::signer;
    use std::vector;
    use aptos_framework::account;
    use aptos_framework::event;
    use aptos_framework::timestamp;

    struct CreditScore has key {
        score: u64,
        history: vector<ScoreHistory>,
        last_updated: u64,
    }

    struct ScoreHistory has store, drop {
        score: u64,
        timestamp: u64,
    }

    struct CreditScoreEvents has key {
        score_update_events: event::EventHandle<ScoreUpdateEvent>,
    }

    struct ScoreUpdateEvent has drop, store {
        old_score: u64,
        new_score: u64,
        timestamp: u64,
    }

    const INITIAL_SCORE: u64 = 650;
    const MIN_SCORE: u64 = 300;
    const MAX_SCORE: u64 = 850;

    const ENOT_INITIALIZED: u64 = 1;
    const EINVALID_SCORE: u64 = 2;

    public fun initialize(account: &signer) {
        let addr = signer::address_of(account);
        assert!(!exists<CreditScore>(addr), ENOT_INITIALIZED);

        let initial_history = vector::empty<ScoreHistory>();
        vector::push_back(&mut initial_history, ScoreHistory {
            score: INITIAL_SCORE,
            timestamp: timestamp::now_seconds(),
        });

        move_to(account, CreditScore {
            score: INITIAL_SCORE,
            history: initial_history,
            last_updated: timestamp::now_seconds(),
        });

        move_to(account, CreditScoreEvents {
            score_update_events: account::new_event_handle<ScoreUpdateEvent>(account),
        });
    }

    public fun update_score(
        account: &signer,
        new_score: u64,
    ) acquires CreditScore, CreditScoreEvents {
        let addr = signer::address_of(account);
        assert!(exists<CreditScore>(addr), ENOT_INITIALIZED);
        assert!(new_score >= MIN_SCORE && new_score <= MAX_SCORE, EINVALID_SCORE);

        let credit_score = borrow_global_mut<CreditScore>(addr);
        let old_score = credit_score.score;
        credit_score.score = new_score;

        let current_time = timestamp::now_seconds();
        vector::push_back(&mut credit_score.history, ScoreHistory {
            score: new_score,
            timestamp: current_time,
        });
        credit_score.last_updated = current_time;

        let events = borrow_global_mut<CreditScoreEvents>(addr);
        event::emit_event(
            &mut events.score_update_events,
            ScoreUpdateEvent {
                old_score,
                new_score,
                timestamp: current_time,
            },
        );
    }

    public fun get_score(addr: address): u64 acquires CreditScore {
        assert!(exists<CreditScore>(addr), ENOT_INITIALIZED);
        let credit_score = borrow_global<CreditScore>(addr);
        credit_score.score
    }

    public fun get_history(addr: address): vector<ScoreHistory> acquires CreditScore {
        assert!(exists<CreditScore>(addr), ENOT_INITIALIZED);
        let credit_score = borrow_global<CreditScore>(addr);
        credit_score.history
    }

    public fun get_last_updated(addr: address): u64 acquires CreditScore {
        assert!(exists<CreditScore>(addr), ENOT_INITIALIZED);
        let credit_score = borrow_global<CreditScore>(addr);
        credit_score.last_updated
    }
}