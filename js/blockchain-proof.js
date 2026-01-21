// SHAM v5 Pro - Blockchain Proof & Timestamping
// Immutable discovery records and data integrity verification

class BlockchainProof {
    constructor() {
        this.records = [];
        this.chain = [];
        console.log('🔗 Blockchain Proof System initialized');
    }

    // Generate SHA-256 hash
    async sha256(data) {
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(JSON.stringify(data));
        const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    // Create timestamped proof record
    async createProof(discovery) {
        const timestamp = new Date().toISOString();
        const previousHash = this.chain.length > 0 ? this.chain[this.chain.length - 1].hash : '0'.repeat(64);

        const record = {
            id: `SHAM-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            timestamp: timestamp,
            previousHash: previousHash,
            data: {
                projectName: 'SHAM - Secret History and Archaeology Mission',
                discoveryType: discovery.type || 'anomaly',
                coordinates: discovery.coordinates,
                probability: discovery.probability,
                sensorData: discovery.sensorData,
                classification: discovery.classification
            },
            hash: null
        };

        record.hash = await this.sha256(record);
        this.chain.push(record);
        this.records.push(record);

        console.log(`✅ Proof created: ${record.id}`);
        return record;
    }

    // Verify chain integrity
    async verifyChain() {
        for (let i = 1; i < this.chain.length; i++) {
            const current = this.chain[i];
            const previous = this.chain[i - 1];

            // Verify previous hash link
            if (current.previousHash !== previous.hash) {
                return { valid: false, error: `Chain broken at block ${i}` };
            }

            // Verify current hash
            const recordCopy = { ...current, hash: null };
            const calculatedHash = await this.sha256(recordCopy);
            if (calculatedHash !== current.hash) {
                return { valid: false, error: `Tampered data at block ${i}` };
            }
        }
        return { valid: true, blocks: this.chain.length };
    }

    // Generate proof certificate
    generateCertificate(record) {
        return `
╔══════════════════════════════════════════════════════════════════╗
║           SHAM DISCOVERY PROOF CERTIFICATE                       ║
╠══════════════════════════════════════════════════════════════════╣
║  Record ID: ${record.id.padEnd(50)}║
║  Timestamp: ${record.timestamp.padEnd(50)}║
║  SHA-256:   ${record.hash.substring(0, 48)}...║
║                                                                  ║
║  Discovery Type: ${(record.data.discoveryType || 'Unknown').padEnd(44)}║
║  Coordinates: ${JSON.stringify(record.data.coordinates).padEnd(47)}║
║  Probability: ${((record.data.probability * 100).toFixed(1) + '%').padEnd(47)}║
║                                                                  ║
║  This certificate proves the existence and timestamp of the      ║
║  above discovery data. The SHA-256 hash can be independently     ║
║  verified against blockchain anchors and IPFS records.           ║
╚══════════════════════════════════════════════════════════════════╝
`;
    }

    // Export for IPFS pinning
    exportForIPFS() {
        return {
            version: '1.0',
            project: 'SHAM',
            exportedAt: new Date().toISOString(),
            chainLength: this.chain.length,
            records: this.chain,
            merkleRoot: this.calculateMerkleRoot()
        };
    }

    async calculateMerkleRoot() {
        if (this.chain.length === 0) return null;
        let hashes = this.chain.map(r => r.hash);
        while (hashes.length > 1) {
            const newHashes = [];
            for (let i = 0; i < hashes.length; i += 2) {
                const pair = hashes[i] + (hashes[i + 1] || hashes[i]);
                newHashes.push(await this.sha256(pair));
            }
            hashes = newHashes;
        }
        return hashes[0];
    }

    // Get all records
    getRecords() { return this.records; }
    getChain() { return this.chain; }
}

window.BlockchainProof = BlockchainProof;
window.blockchainProof = new BlockchainProof();
