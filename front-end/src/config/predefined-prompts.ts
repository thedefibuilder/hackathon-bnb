import type TPrompt from '@/types/prompt';

const predefinedTokenPrompts: TPrompt[] = [
  {
    template: 'Token',
    title: 'Name and Supply',
    content:
      'Create an ERC20 token with name "DeFi Builder", symbol "DFB" and a total supply of 100,000.'
  },
  {
    template: 'Token',
    title: 'Pausable Token',
    content:
      'Create a pausable Token named DeFi Builder with symbol DFB, where only owner can mint.'
  },
  {
    template: 'Token',
    title: 'Burnable Token',
    content:
      'Design an ERC20 token named "Crypto Flames" with the symbol "CFLM" that includes burn functionality. The initial total supply should be 1,000,000 tokens, and token holders should have the ability to burn their tokens to reduce the total supply.'
  },
  {
    template: 'Token',
    title: 'Role-Based Permissions and Tax Mechanism',
    content:
      'Create an ERC20 token named "Eco Token" with the symbol "ECO", initiating with a total supply of 10,000,000. Implement role-based permissions that allow designated addresses to mint or burn tokens. Additionally, integrate a transaction tax mechanism where 1% of every transaction is automatically sent to a specified charity wallet.'
  }
];

const predefinedNftPrompts: TPrompt[] = [
  {
    template: 'NFT',
    title: 'NFT with Incrementing IDs',
    content:
      'Develop an ERC721 Non-Fungible Token (NFT) collection named "Unique Collectibles" with the symbol "UNIQ". Implement the contract so that it auto-increments token IDs each time a new NFT is minted, ensuring each token has a unique identifier. Include public minting functionality where users can mint new NFTs directly, but limit the total number of mintable NFTs to 10,000 to maintain exclusivity.'
  },
  {
    template: 'NFT',
    title: 'NFT with Metadata and URI Storage',
    content:
      'Construct an ERC721 token for a digital art project named "Art Blocks" with the symbol "ARTB". Each token should have associated metadata and a unique URI pointing to an IPFS (InterPlanetary File System) JSON file containing details like the artist\'s name, artwork title, and a link to the artwork image. Ensure that the contract owner can update the base URI for the metadata'
  },
  {
    template: 'NFT',
    title: 'NFT with Royalty',
    content:
      'Generate an ERC721 Non-Fungible Token collection called "Creator\'s Royalty" with the symbol "CRFT". Incorporate EIP-2981 royalty standard support to enable automatic royalty payments to the original creator from secondary sales. Set a standard royalty percentage that applies to all tokens within the collection.'
  },
  {
    template: 'NFT',
    title: 'NFT with Whitelist',
    content:
      'Build an ERC721 token named "VIP Pass" with the symbol "VIPP", designed to grant special access or rewards within your ecosystem. Implement access control to allow only the contract owner to mint new tokens. Additionally, incorporate a whitelisting feature enabling the contract owner to pre-approve addresses that are allowed to mint the NFTs, ensuring exclusivity and control over the distribution.'
  },
  {
    template: 'NFT',
    title: 'NFT with Batch Minting',
    content:
      'Create an ERC721 token for a series named "Crypto Creatures" with the symbol "CCRS". Add functionality to allow batch minting of tokens to efficiently create multiple NFTs in a single transaction, reducing gas costs and improving user experience. Also, include batch transfer capabilities, enabling users to transfer multiple NFTs to another address with one transaction.'
  }
];

const predefinedEditionPrompts: TPrompt[] = [
  {
    template: 'Edition',
    title: 'Game Inventory System ERC1155 token',
    content:
      'Develop an ERC1155 token named "Epic Game Assets" with a URI pointing to a JSON file on IPFS for metadata. This token should support multiple types of assets for a game, including weapons, armor, and potions. Each type of asset should have its unique ID and the ability to mint multiple copies. Include functionality for players to trade assets directly through the contract.'
  },
  {
    template: 'Edition',
    title: 'ERC1155 Token with Limited Edition Collectibles',
    content:
      'Construct an ERC1155 collection for "Digital Masterpieces", where each piece is a limited edition with a capped number of copies. Use unique token IDs for different artworks, and set a maximum supply for each. Include a public minting function that allows users to mint copies until the maximum supply is reached, and ensure that each token\'s metadata URI correctly points to its digital artwork and artist details.'
  },
  {
    template: 'Edition',
    title: 'ERC1155 Token with Role-Based Permissions for Minting and Burning',
    content:
      'Generate an ERC1155 token named "Community Tokens" designed for various community rewards, including membership badges, event tickets, and contribution tokens. Implement role-based permissions using OpenZeppelin\'s AccessControl for different roles such as Admin, MintingAgent, and BurnAgent, allowing specific actions to be performed only by users with the appropriate roles.'
  },
  {
    template: 'Edition',
    title: 'ERC1155 Token with Dynamic Metadata and On-Chain Royalties',
    content:
      'Design an ERC1155 token for "Evolving Artworks", where each token represents a piece of digital art that can evolve or change states based on specific triggers or milestones. Use the ERC1155 metadata extension to dynamically update token URIs based on their state. Incorporate EIP-2981 royalty standard support to enable automatic royalty payments to artists on secondary sales, with the ability to set and update royalty information for each token ID.'
  }
];

const predefinedVaultPrompts: TPrompt[] = [
  {
    template: 'Vault',
    title: 'Shares Vault',
    content: 'Create a vault that distributes shares based on deposited amount.'
  },
  {
    template: 'Vault',
    title: 'Yield Aggregator Vault',
    content:
      'Develop an ERC4626 vault named "YieldMaximizer" designed to automatically move deposited assets between different DeFi protocols to maximize yield. The vault should accept a stablecoin, such as USDC, and periodically rebalance the holdings based on yield optimization strategies.'
  },
  {
    template: 'Vault',
    title: 'ERC4626 Vault with Strategy Rotation',
    content:
      'Construct an ERC4626 compliant vault called "Strategic Allocator" that allows governance token holders to vote on which yield-generating strategy the vault should currently employ. This vault should be capable of holding multiple types of assets and rotating between strategies like lending, liquidity provision, and staking based on governance votes. Include a mechanism for strategy developers to propose new strategies to be added to the vault.'
  },
  {
    template: 'Vault',
    title: 'ERC1155 Token with Dynamic Metadata and On-Chain Royalties',
    content:
      'Design an ERC1155 token for "Evolving Artworks", where each token represents a piece of digital art that can evolve or change states based on specific triggers or milestones. Use the ERC1155 metadata extension to dynamically update token URIs based on their state. Incorporate EIP-2981 royalty standard support to enable automatic royalty payments to artists on secondary sales, with the ability to set and update royalty information for each token ID.'
  }
];

const predefinedMarketplacePrompts: TPrompt[] = [
  {
    template: 'Marketplace',
    title: 'Simple Marketplace',
    content:
      'Create an NFT marketplace smart contract named "ArtBay" that allows users to mint ERC721 tokens representing digital art. Include functions for listing NFTs for sale, buying NFTs with ETH, and withdrawing sales proceeds by the sellers. Ensure each NFT has a unique identifier and metadata URL, and implement a commission system where a percentage of each sale is sent to the marketplace owner.'
  },
  {
    template: 'Marketplace',
    title: 'Marketplace with Auction System for NFTs',
    content:
      'Construct an NFT marketplace with an integrated auction system named "AuctionHouse". This system should allow NFT owners to list their assets for auction, specifying a minimum reserve price and auction duration. Implement bidding functionality, with bids being placed in ETH, and an automatic transfer of the NFT to the highest bidder upon auction completion, while ensuring that failed bids are refunded.'
  },
  {
    template: 'Marketplace',
    title: 'NFT Rental Marketplace',
    content:
      'Build an NFT marketplace named "NFTLease" that introduces a rental system for digital assets. Allow NFT owners to list their assets for rent, specifying rental terms such as duration and price. Develop smart contract logic to temporarily transfer NFT usage rights to renters while ensuring ownership remains with the original owner, and automate the return of NFTs upon rental expiration.'
  }
];

const predefinedExchangePrompts: TPrompt[] = [
  {
    template: 'Exchange',
    title: 'Basic AMM',
    content:
      'Create a decentralized exchange named "LiquidSwap" based on the AMM model. This DEX should allow users to trade ERC20 tokens directly from their wallets without an order book. Implement liquidity pools for different trading pairs, allowing users to provide liquidity by depositing token pairs and earning transaction fees from trades proportional to their share of the pool. Include a function for automatic price determination based on the constant product formula (x * y = k).'
  }
];

export {
  predefinedTokenPrompts,
  predefinedNftPrompts,
  predefinedEditionPrompts,
  predefinedVaultPrompts,
  predefinedMarketplacePrompts,
  predefinedExchangePrompts
};
