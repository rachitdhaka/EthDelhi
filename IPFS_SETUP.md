# IPFS Setup Guide

## 🚀 Quick Setup (Recommended for Development)

### Option 1: Use Mock IPFS (No Setup Required)
The system is configured to work with mock IPFS by default. No additional setup needed!

### Option 2: Real IPFS Node (Production Ready)

#### 1. Install IPFS
```bash
# Download IPFS from https://ipfs.io/docs/install/
# Or use package manager:

# Windows (using Chocolatey)
choco install ipfs

# macOS (using Homebrew)
brew install ipfs

# Linux (using snap)
sudo snap install ipfs
```

#### 2. Initialize IPFS
```bash
ipfs init
```

#### 3. Start IPFS Daemon
```bash
ipfs daemon
```

#### 4. Configure Environment Variables
Add to your Backend `.env` file:
```env
IPFS_HOST=localhost
IPFS_PORT=5001
IPFS_PROTOCOL=http
```

#### 5. Verify IPFS is Running
```bash
curl http://localhost:5001/api/v0/version
```

## 🔧 Alternative: Use IPFS Gateway Services

### Pinata (Recommended for Production)
1. Sign up at https://pinata.cloud/
2. Get your API key and secret
3. Update the IPFS service to use Pinata API

### Infura IPFS
1. Sign up at https://infura.io/
2. Create an IPFS project
3. Get your project ID and secret

## 📊 IPFS Integration Features

### What's Working:
- ✅ **File Upload**: Documents uploaded to IPFS
- ✅ **Hash Generation**: SHA256 hashes for document integrity
- ✅ **On-chain Storage**: IPFS CIDs stored in smart contracts
- ✅ **Multiple Files**: Support for multiple document uploads
- ✅ **File Validation**: PDF, JPG, PNG file type validation
- ✅ **Size Limits**: 10MB per file limit

### Mock vs Real IPFS:
- **Mock Mode**: Generates fake CIDs for development
- **Real Mode**: Actual IPFS uploads with real CIDs
- **Automatic Fallback**: Falls back to mock if IPFS unavailable

## 🧪 Testing IPFS Integration

### 1. Check IPFS Status
```bash
curl http://localhost:3000/api/ipfs/status
```

### 2. Upload Test File
```bash
curl -X POST http://localhost:3000/api/ipfs/upload \
  -F "file=@test.pdf" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. Verify File Retrieval
```bash
curl http://localhost:3000/api/ipfs/get/QmYourCID
```

## 🔍 Monitoring

### IPFS Node Stats
```bash
ipfs stats repo
```

### Backend Logs
Look for these log messages:
- `📤 Uploading X files to IPFS...`
- `✅ IPFS upload complete. CID: Qm...`
- `✅ Document stored on-chain for user: 0x...`

## 🚨 Troubleshooting

### Common Issues:

1. **IPFS Not Running**
   - Error: `ECONNREFUSED`
   - Solution: Start IPFS daemon with `ipfs daemon`

2. **File Upload Fails**
   - Check file size (max 10MB)
   - Check file type (PDF, JPG, PNG only)
   - Check IPFS node is accessible

3. **CID Not Generated**
   - Check IPFS node logs
   - Verify file was actually uploaded
   - Check network connectivity

### Debug Mode:
Set `NODE_ENV=development` to see detailed IPFS logs.

## 📈 Production Considerations

### For Production Use:
1. **Use IPFS Pinning Services** (Pinata, Infura)
2. **Set up IPFS Cluster** for redundancy
3. **Configure IPFS Gateway** for public access
4. **Monitor IPFS Node Health**
5. **Set up Backup Strategy**

### Security:
- Files are stored publicly on IPFS
- Use encryption for sensitive documents
- Consider private IPFS networks for sensitive data

## 🎯 Next Steps

1. **Start with Mock IPFS** for development
2. **Set up local IPFS node** for testing
3. **Use Pinata/Infura** for production
4. **Monitor and optimize** performance

Your RWA platform now has real IPFS integration! 🚀
