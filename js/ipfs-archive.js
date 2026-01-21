// SHAM v5 Pro - IPFS Decentralized Storage
// Censorship-resistant data archiving

class IPFSArchive {
    constructor() {
        this.gateway = 'https://ipfs.io/ipfs/';
        this.pinataGateway = 'https://gateway.pinata.cloud/ipfs/';
        this.archives = [];
        this.pendingUploads = [];
        console.log('📦 IPFS Archive System initialized');
    }

    // Pin data to IPFS via public pinning services
    async pinToIPFS(data, name) {
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        const cid = await this.generateCID(data);

        const archive = {
            id: `IPFS-${Date.now()}`,
            name: name,
            cid: cid,
            size: blob.size,
            timestamp: new Date().toISOString(),
            status: 'simulated',
            urls: {
                ipfsio: `${this.gateway}${cid}`,
                pinata: `${this.pinataGateway}${cid}`,
                dweb: `https://dweb.link/ipfs/${cid}`
            },
            data: data
        };

        this.archives.push(archive);
        return archive;
    }

    // Generate simulated CID (In production, use actual IPFS)
    async generateCID(data) {
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(JSON.stringify(data));
        const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const base58Chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
        let cid = 'Qm';
        for (let i = 0; i < 44; i++) {
            cid += base58Chars[hashArray[i % hashArray.length] % 58];
        }
        return cid;
    }

    // Archive discovery data
    async archiveDiscovery(discovery) {
        const archiveData = {
            project: 'SHAM - Secret History and Archaeology Mission',
            version: '5.0',
            type: 'discovery_archive',
            discovery: discovery,
            blockchain_hash: discovery.hash || null,
            archived_at: new Date().toISOString()
        };

        return await this.pinToIPFS(archiveData, `Discovery ${discovery.id}`);
    }

    // Archive entire project state
    async archiveProjectState(projectData) {
        return await this.pinToIPFS({
            project: 'SHAM',
            type: 'full_state_backup',
            ...projectData,
            archived_at: new Date().toISOString()
        }, 'Project State Backup');
    }

    // Get archive by CID
    getArchive(cid) {
        return this.archives.find(a => a.cid === cid);
    }

    // Get all archives
    getAllArchives() { return this.archives; }

    // Generate Arweave manifest (for permanent storage)
    generateArweaveManifest(data) {
        return {
            manifest: 'arweave/paths',
            version: '0.1.0',
            index: { path: 'index.json' },
            paths: {
                'index.json': { id: this.generateTxId() },
                'discovery.json': { id: this.generateTxId() },
                'proof.json': { id: this.generateTxId() }
            },
            data: data
        };
    }

    generateTxId() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
        let txId = '';
        for (let i = 0; i < 43; i++) txId += chars[Math.floor(Math.random() * 64)];
        return txId;
    }

    // Instructions for real IPFS setup
    getSetupInstructions() {
        return {
            option1_pinata: {
                name: 'Pinata (Free tier: 1GB)',
                steps: [
                    '1. Sign up at https://pinata.cloud/',
                    '2. Get API keys from dashboard',
                    '3. Use: pinata.pinJSONToIPFS(data)'
                ]
            },
            option2_web3storage: {
                name: 'Web3.Storage (Free tier: 5GB)',
                steps: [
                    '1. Sign up at https://web3.storage/',
                    '2. Get API token',
                    '3. Use: client.put(files)'
                ]
            },
            option3_local: {
                name: 'Local IPFS Node',
                steps: [
                    '1. Install: https://docs.ipfs.tech/install/',
                    '2. Run: ipfs daemon',
                    '3. Add: ipfs add <file>'
                ]
            }
        };
    }
}

window.IPFSArchive = IPFSArchive;
window.ipfsArchive = new IPFSArchive();
