// SHAM v5 Pro - Crowdsourced Verification System
// Distributed peer review and anomaly voting

class CrowdsourcedVerification {
    constructor() {
        this.anomalies = [];
        this.votes = [];
        this.researchers = [];
        this.verificationThreshold = 0.7; // 70% agreement = verified
        console.log('👥 Crowdsourced Verification System initialized');
    }

    // Submit anomaly for community review
    submitForReview(anomaly) {
        const submission = {
            id: `REV-${Date.now()}`,
            anomalyId: anomaly.id,
            coordinates: anomaly.coordinates,
            probability: anomaly.probability,
            submittedBy: anomaly.submittedBy || 'anonymous',
            submittedAt: new Date().toISOString(),
            status: 'pending',
            votes: { confirm: 0, reject: 0, uncertain: 0 },
            comments: [],
            verificationScore: 0
        };

        this.anomalies.push(submission);
        return submission;
    }

    // Cast vote on anomaly
    vote(submissionId, researcherId, voteType, comment = '') {
        const submission = this.anomalies.find(a => a.id === submissionId);
        if (!submission) return { error: 'Submission not found' };

        // Check if already voted
        const existingVote = this.votes.find(v =>
            v.submissionId === submissionId && v.researcherId === researcherId
        );
        if (existingVote) return { error: 'Already voted' };

        const vote = {
            id: `VOTE-${Date.now()}`,
            submissionId: submissionId,
            researcherId: researcherId,
            voteType: voteType, // 'confirm', 'reject', 'uncertain'
            comment: comment,
            timestamp: new Date().toISOString()
        };

        this.votes.push(vote);
        submission.votes[voteType]++;

        if (comment) {
            submission.comments.push({
                researcherId: researcherId,
                text: comment,
                timestamp: vote.timestamp
            });
        }

        // Recalculate verification score
        this.calculateVerificationScore(submission);

        return vote;
    }

    calculateVerificationScore(submission) {
        const total = submission.votes.confirm + submission.votes.reject + submission.votes.uncertain;
        if (total === 0) {
            submission.verificationScore = 0;
            return;
        }

        // Weighted scoring: confirm=1, uncertain=0.5, reject=0
        const score = (submission.votes.confirm + submission.votes.uncertain * 0.5) / total;
        submission.verificationScore = score;

        // Update status
        if (total >= 5) { // Minimum 5 votes to determine status
            if (score >= this.verificationThreshold) {
                submission.status = 'verified';
            } else if (score <= 0.3) {
                submission.status = 'rejected';
            } else {
                submission.status = 'inconclusive';
            }
        }
    }

    // Register researcher
    registerResearcher(researcher) {
        const profile = {
            id: `RES-${Date.now()}`,
            name: researcher.name,
            institution: researcher.institution || 'Independent',
            expertise: researcher.expertise || [],
            reputation: 50, // Start at 50/100
            votesCount: 0,
            accurateVotes: 0,
            joinedAt: new Date().toISOString()
        };

        this.researchers.push(profile);
        return profile;
    }

    // Update researcher reputation based on vote accuracy
    updateReputation(researcherId, wasAccurate) {
        const researcher = this.researchers.find(r => r.id === researcherId);
        if (!researcher) return;

        researcher.votesCount++;
        if (wasAccurate) researcher.accurateVotes++;

        researcher.reputation = Math.round(
            (researcher.accurateVotes / researcher.votesCount) * 100
        );
    }

    // Get leaderboard
    getLeaderboard() {
        return [...this.researchers]
            .sort((a, b) => b.reputation - a.reputation)
            .slice(0, 20);
    }

    // Get pending submissions for review
    getPendingReviews() {
        return this.anomalies.filter(a => a.status === 'pending');
    }

    // Get verified discoveries
    getVerifiedDiscoveries() {
        return this.anomalies.filter(a => a.status === 'verified');
    }

    // Generate verification report
    generateReport(submissionId) {
        const submission = this.anomalies.find(a => a.id === submissionId);
        if (!submission) return null;

        return {
            submissionId: submission.id,
            status: submission.status,
            verificationScore: (submission.verificationScore * 100).toFixed(1) + '%',
            totalVotes: submission.votes.confirm + submission.votes.reject + submission.votes.uncertain,
            voteBreakdown: submission.votes,
            comments: submission.comments,
            generatedAt: new Date().toISOString()
        };
    }

    // Simulate community activity
    simulateCommunity(submissionId, numVoters = 10) {
        for (let i = 0; i < numVoters; i++) {
            const researcherId = `SIM-${i}`;
            const rand = Math.random();
            const voteType = rand > 0.7 ? 'confirm' : rand > 0.3 ? 'uncertain' : 'reject';
            this.vote(submissionId, researcherId, voteType, '');
        }
    }
}

window.CrowdsourcedVerification = CrowdsourcedVerification;
window.crowdsourcedVerification = new CrowdsourcedVerification();
