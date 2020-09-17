// Author			: https://github.com/ArfendoDhimas
// Reference	: https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.197.pdf

var RINJDAEL_PRESET = {
	SBOX: function(index)
	{
		var data = [
				0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,
				0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0,
				0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
				0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75,
				0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84,
				0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
				0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8,
				0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2,
				0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
				0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb,
				0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79,
				0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
				0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
				0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e,
				0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
				0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16
		];
		return data[index];
	},

	INVERS_SBOX: function(index)
	{
		var data = [
				0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb,
				0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb,
				0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e,
				0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25,
				0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92,
				0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84,
				0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06,
				0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b,
				0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73,
				0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e,
				0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b,
				0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4,
				0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f,
				0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef,
				0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61,
				0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d
		];
		return data[index];
	},

	RCON: function(index)
	{
		var data = [
				[1,0,0,0],
				[2,0,0,0],
				[4,0,0,0],
				[8,0,0,0],
				[16,0,0,0],
				[32,0,0,0],
				[64,0,0,0],
				[128,0,0,0],
				[27,0,0,0],
				[54,0,0,0]
		];
		return data[index];
	}
}

var utils = {
	copyArray: function(array)
	{
		var temp = []
		for (var i = 0; i < array.length; i++)
		{
			temp.push(array[i]);
		}
		return temp;
	}
}

class AES{
	#Nb;
	#key; #Nr; #expansion_key;
	#mode; #initial_vector;
	#notif;
	#typeof_source_data; #cache_length;

	
	// Supported mode 					: "ECB" or "CBC"
	// Length of key 						: 16, 24 or 32 chars of String or elements Array one dimension
	// Length of initial_vector : 16 chars of String or elements Array one dimension
	constructor(mode = 'ECB', key = '!@#qwe1234567890', initial_vector = '!@#qwe1234567890')
	{
		this.#notif = {status : false, msg : ''};
		this.#cache_length = [];
		this.#Nb = 4;
		this.setMode(mode);
		this.setKey(key);
		if (mode == 'CBC')
		{
			this.setInitialVector(initial_vector);
		}
	}

	getNotification()
	{
		return this.#notif;
	}

	setKey(key)
	{
		try
		{
			var temp_key = [];
			if (key.length != 16 ^ key.length != 24 ^ key.length != 32)
			{
				throw 'Invalid key. The length of Key must be 16, 24 or 32 chars of String or elements of Array!';
			}
			if (typeof key == 'string')
			{
				for (var i = 0; i < key.length; i++)
				{
					var char_code = key.charCodeAt(i);
					if (char_code > 255)
					{
						throw 'Unsupported chars on String. Please use ASCII charset for Key String!';
					}
					temp_key.push(char_code);
				}
			}
			if (typeof key == 'object')
			{
				for (var i = 0; i < key.length; i++)
				{
					var code = key[i];
					if (typeof code != 'number' || Math.floor(code) != code || code < 0 || 255 < code)
					{
						throw 'Unsupported elements on Array. Please use index number of ASCII Code for elements of Array!';
					}
					temp_key.push(code);
				}
			}
			if (temp_key == [])
			{
				throw 'Unsupported Key.';
			}
			this.#key = temp_key;
			this.#setNumberRotation(temp_key);
			this.#setExpansionKey(temp_key);

			this.#notif.ststus = true;
			this.#notif.msg = 'Success set the Key.';
			console.log(this.#notif.msg);
			return this.#notif.status;
		}
		catch(error)
		{
			this.#notif.status = false;
			this.#notif.msg = error;
			console.error(this.#notif.msg);
			return this.#notif.status;
		}		
	}

	getKey()
	{
		return this.#key;
	}

	#setNumberRotation(key)
	{
		switch (key.length)
		{
			case 16 : this.#Nr = 10; break;
			case 24 : this.#Nr = 12; break;
			case 32 : this.#Nr = 14; break;
			default : this.#Nr = 0; break;
		}
	}

	#setExpansionKey(key)
	{
		const Nk = Math.floor(key.length/4);
		var expansion_key = [];
		var key_schadule = [];

		// generate first expansion_key (4*Nk) from key string
		var i = 0;
		do
		{
			for (var j = 0; j < 4; j++)
			{
				key_schadule.push(key[4*i+j]);
			}
			expansion_key.push(key_schadule);
			key_schadule = [];
			i++;
		} while(i < Nk);

		// continue generate expansion_key
		i = Nk;
		while (i < this.#Nb * (this.#Nr + 1))
		{
			key_schadule = utils.copyArray(expansion_key[i-1]);

			if (i % Nk == 0) 
			{
				this.#tRotWord(key_schadule);
				this.#tSubWord(key_schadule);
				this.#tXOR(key_schadule, RINJDAEL_PRESET.RCON(Math.floor(i/Nk)-1));
			}
			else if (Nk > 6 && i % Nk == 4)
			{
				this.#tSubWord(key_schadule);
			}

			this.#tXOR(key_schadule, expansion_key[i-Nk]);
			expansion_key.push(key_schadule);
			key_schadule = [];
			i++;
		}
		this.#expansion_key = expansion_key;
	}

	setMode(mode)
	{
		try
		{
			switch (mode)
			{
				case 'ECB' : case 'CBC' :
						this.#mode = mode;
						this.#notif.status = true;
						this.#notif.msg = 'Success set the Mode.';
						console.log(this.#notif.msg);
						return this.#notif.status;
				default :
						throw '\"'+mode+'\" is not supported Mode. Please select Mode : \"ECB\" or \"CBC\"!';
			}			
		}
		catch(error)
		{
			this.#notif.status = false;
			this.#notif.msg = error;
			console.error(this.#notif.msg);
			return this.#notif.status;
		}
	}

	getMode()
	{
		return this.#mode;
	}

	setInitialVector(initial_vector)
	{
		try
		{
			var temp_initial_vector = [];
			if (this.getMode() != 'CBC')
			{
				throw 'Your selected Mode (\"'+this.getMode()+'\") doesn\'t need Initial Vector';
			}
			if (initial_vector.length != 4*this.#Nb)
			{
				throw 'Length of Initial Vector must be 16 char String or elements of Array!';
			}
			if (typeof initial_vector == 'string')
			{
				for (var i = 0; i < initial_vector.length; i++)
				{
					var char_code = initial_vector.charCodeAt(i);
					if (char_code > 255)
					{
						throw 'Unsupported chars on String. Please use ASCII charset for Initial Vector String!';
					}
					temp_initial_vector.push(char_code);
				}
			}
			if (typeof initial_vector == 'object')
			{
				for (var i = 0; i < initial_vector.length; i++)
				{
					var code = initial_vector[i];
					if (typeof code != 'number' || Math.floor(code) != code || code < 0 || 255 < code)
					{
						throw 'Unsupported elements on Array. Please use index number of ASCII Code for elements of Array!';
					}
					temp_initial_vector.push(code);
				}
			}
			if (temp_initial_vector == [])
			{
				throw 'Unsupported Initial Vector.';
			}
			this.#initial_vector = temp_initial_vector;
			this.#notif.status = true;
			this.#notif.msg = 'Success set the Initial Vector';
			console.log(this.#notif.msg);
			return this.#notif.status;
		}
		catch(error)
		{
			this.#notif.status = false;
			this.#notif.msg = error;
			console.error(this.#notif.msg);
			return this.#notif.status;
		}
	}

	getInitialVector()
	{
		return this.#initial_vector;
	}
	
	#getAllStateFrom(source_data){
		var all_state = [];
		var state = [];
		var x = 0, y = 0;
		if(this.#typeof_source_data == 'object' || this.#typeof_source_data == 'string')
		{
			for (var i = 0; i < source_data.length; i++) 
			{
				// This is for rebulid as original Array
				this.#cache_length[i] = source_data[i].length;

				for (var j = 0; j < source_data[i].length; j++)
				{					
					var e = source_data[i][j];
					// This is for Array with elements are index number of ASCII Charset
					if (typeof e == 'number' && Math.floor(e) == e  && 0 <= e && e <= 255)
					{
						state.push(e); y++;
					}
					// This is for String with ASCII Charset
					else if (typeof e == 'string' && e.length == 1 && e.charCodeAt(0) <= 255)
					{
						state.push(e.charCodeAt(0)); y++;
					}
					// This is for invalid Source Data
					else
					{
						throw 'Invalid Source Data.';
					}

					if (y == (this.#Nb * 4))
					{
						all_state.push(state);
						state = [];
						y = 0;
					}
				}
			}
			if (y > 0)
			{
				all_state.push(state);
			}
		}
		else 
		{
			all_state.push(state);
		}
		return all_state;
	}

	#rebuild(all_state)
	{
		var result;
		if (this.#typeof_source_data == 'object')
		{
			result = [];
			var row = [];
			var m = 0;
			var n = 0;
			for (var i = 0; i < all_state.length; i++) {
				for (var j = 0; j < all_state[i].length; j++) {
					row.push(all_state[i][j]); n++;
					if (n == this.#cache_length[m]) {
						result.push(row); m++;
						row = [];
						n = 0;
					}
				}
			}
		}
		else if (this.#typeof_source_data == 'string')
		{
			result = "";
			for (var i = 0; i < all_state.length; i++) {
				for (var j = 0; j < all_state[i].length; j++) {
						result += String.fromCharCode(all_state[i][j]);
				}
			}
		}
		else
		{
			throw 'Type of Source Data is not supported.'
		}
		return result;
	}

	encrypt(source_data)
	{
		try{
			this.#typeof_source_data = typeof source_data;
			if (this.#typeof_source_data == 'string')
			{
				source_data = this.#addPadding(source_data);
			}
			// console.log(source_data);
			const all_state = this.#getAllStateFrom(source_data);
			var state = [];
			var cipher_blocks = [];

			// Sequance Process
			for (var i = 0; i < all_state.length; i++) 
			{
				state = utils.copyArray(all_state[i]);
				if (all_state[i].length ==  (this.#Nb*4))
				{
					switch(this.getMode())
					{
						case 'ECB' :
								this.#encryptModeECB(state);
								break;

						case 'CBC' :
								var vector = [];
								switch (i)
								{
									case 0 :
											vector = this.getInitialVector(); break;
									default :
											vector = cipher_blocks[i-1]; break;
								}
								this.#encryptModeCBC(state,vector);
								break;

						default :
								return null;
					}			
					cipher_blocks[i] = state;
				} 
				else 
				{
					cipher_blocks[i] = state;
				}
			}
			var result;
			if (this.#typeof_source_data == 'string')
			{
				result = this.#rebuild(cipher_blocks);
				result = btoa(result); // Encode to base64
			}
			else if (this.#typeof_source_data == 'object')
			{
				result = this.#rebuild(cipher_blocks);
			}
			else{
				throw 'Invalid Source Data.'
			}
			this.#notif.status = true;
			this.#notif.msg = 'Success Encrypt Source Data.';
			console.log(this.#notif.msg);
			return result;
		}
		catch(error)
		{
			this.#notif.status = false;
			this.#notif.msg = error;
			console.error(this.#notif.msg);
			return this.#notif.status;
		}
	}

	// Encrypt Mode ECB (Electronic Code Book)
	#encryptModeECB(state)
	{
		var r = 0;
		this.#tAddRoundKey(state,r);
		for (r = 1; r < this.#Nr; r++) 
		{
			this.#tSubByte(state);
			this.#tShiftRows(state);
			this.#tMixColumn(state);
			this.#tAddRoundKey(state,r);
		}
		this.#tSubByte(state);
		this.#tShiftRows(state);
		this.#tAddRoundKey(state,r);
	}

	// Encrypt Mode CBC (Cipher Block Chaining)
	#encryptModeCBC(state, vector)
	{
		var r = 0;
		this.#tXOR(state,vector);
		this.#tAddRoundKey(state,r);
		for (r = 1; r < this.#Nr; r++) 
		{
			this.#tSubByte(state);
			this.#tShiftRows(state);
			this.#tMixColumn(state);
			this.#tAddRoundKey(state,r);
		}
		this.#tSubByte(state);
		this.#tShiftRows(state);
		this.#tAddRoundKey(state,r);
	}

	decrypt(source_data)
	{
		try
		{
			this.#typeof_source_data = typeof source_data ;
			if (this.#typeof_source_data == 'string')
			{
				source_data = atob(source_data); // Decode from base64
			}
			const all_state = this.#getAllStateFrom(source_data);
			var state;
			var decipher_blocks = [];

			// Sequence Process
			for (var i = 0; i < all_state.length; i++) 
			{
				state = utils.copyArray(all_state[i]);
				if (all_state[i].length == (this.#Nb*4))
				{
					switch(this.#mode)
					{
						case 'ECB' :
								this.#decryptModeECB(state);
								break;

						case 'CBC' :
								var vector = [];
								switch(i)
								{
									case 0 : 
											vector = this.getInitialVector(); break;
									default :
											vector = all_state[i-1]; break;
								}
								this.#decryptModeCBC(state,vector);
								break;

						default :
								return null;
					}
					decipher_blocks[i] = state;
				}
				else
				{
					decipher_blocks[i] = all_state[i];
				}
			}
			var result;
			if (this.#typeof_source_data == 'string')
			{
				result = this.#removePadding(this.#rebuild(decipher_blocks));
			}
			else if (this.#typeof_source_data == 'object')
			{
				result = this.#rebuild(decipher_blocks);
			}
			else{
				throw 'Invalid Source Data.'
			}
			this.#notif.status = true;
			this.#notif.msg = 'Success Decrypt Source Data.';
			console.log(this.#notif.msg);
			return result;
		}
		catch(error)
		{
			this.#notif.status = false;
			this.#notif.msg = error;
			console.error(this.#notif.msg);
			return this.#notif.status;
		}
	}

	// Decrypt Mode ECB (Electronic Code Book)
	#decryptModeECB(state)
	{
		var r = this.#Nr;
		this.#tAddRoundKey(state,r);
		for (r = this.#Nr-1; r > 0 ; r--) 
		{
			this.#tInversShiftRows(state);
			this.#tInversSubByte(state);
			this.#tAddRoundKey(state,r);
			this.#tInversMixColumn(state);
		}
		this.#tInversShiftRows(state);
		this.#tInversSubByte(state);
		this.#tAddRoundKey(state,r);
	}

	// Decrypt Mode CBC (Cipher Block Chaining)
	#decryptModeCBC(state,vector)
	{
		var r = this.#Nr;
		this.#tAddRoundKey(state,r);
		for (r = this.#Nr-1; r > 0 ; r--) 
		{
			this.#tInversShiftRows(state);
			this.#tInversSubByte(state);
			this.#tAddRoundKey(state,r);
			this.#tInversMixColumn(state);
		}
		this.#tInversShiftRows(state);
		this.#tInversSubByte(state);
		this.#tAddRoundKey(state,r);
		this.#tXOR(state,vector);
	}

	#tAddRoundKey(state, r)
	{
		var j = 0;
		for (var i = 0; i < state.length; i++) {
			state[i] = state[i] ^ this.#expansion_key[r*4+Math.floor(i/4)][j++%4];
		}
	}	

	#tSubByte(state)
	{
		for (var i = 0; i < state.length; i++) {
			state[i] = RINJDAEL_PRESET.SBOX(state[i]);
		}
	}

	#tInversSubByte(state)
	{
		for (var i = 0; i < state.length; i++) {
			state[i] = RINJDAEL_PRESET.INVERS_SBOX(state[i]);
		}
	}

	#tShiftRows(state)
	{
		var temp = 0;
		for (var i = 1; i < this.#Nb; i++) {
			for (var j = 0; j < i; j++) {
				var k = 0;
				temp = state[i+k*this.#Nb];
				for (k = 0; k < this.#Nb-1; k++) {
					state[i+k*this.#Nb] = state[i+(k+1)*4];
				}
				state[i+k*this.#Nb] = temp;
			}
		}
	}

	#tInversShiftRows(state)
	{
		var temp_value = 0;
		for (var i = 1; i < this.#Nb; i++) {
			for (var j = 0; j < i; j++) {
				var k = this.#Nb-1;
				temp_value = state[i+k*this.#Nb];
				for (k = this.#Nb-1; k > 0; k--) {
					state[i+k*this.#Nb] = state[i+(k-1)*this.#Nb];
				}
				state[i+k*this.#Nb] = temp_value;
			}
		}
	}

	#tMixColumn(state)
	{
		var result = [];
		var k = 0;
		for (var i = 0; i < state.length; i+=4) 
		{
			for (var j = 0; j < 4; j++) 
			{
				result[k++] = 
							// 0x## * 0x02
							((state[(i+0+j)%4+i]
									*0x02)%256^((state[(i+0+j)%4+i]>>7==1)?0x1b:0))
							// 0x## * 0x03
						^ (((state[(i+1+j)%4+i]
									*0x02)%256^((state[(i+1+j)%4+i]>>7==1)?0x1b:0))
									^state[(i+1+j)%4+i])
							// 0x## * 0x01
						^ state[(i+2+j)%4+i]
							// 0x## * 0x01
						^ state[(i+3+j)%4+i];
			}
		}
		for (var i = 0; i < result.length; i++)
		{
			state[i] = result[i];
		}
	}

	#tInversMixColumn(state)
	{
		var result = [];
		var k = 0;
		for (var i = 0; i < state.length; i+=4) 
		{
			for (var j = 0; j < 4; j++) 
			{
				result[k++] = 
							// 0x## * 0x0e
							((((((((state[(i+0+j)%4+i]
									*0x02)%256^((state[(i+0+j)%4+i]>>7==1)?0x1b:0))
									^state[(i+0+j)%4+i])
									*0x02)%256^(((((state[(i+0+j)%4+i]*0x02)%256^((state[(i+0+j)%4+i]>>7==1)?0x1b:0))^state[(i+0+j)%4+i])>>7==1)?0x1b:0))
									^state[(i+0+j)%4+i])
									*0x02)%256^((((((((state[(i+0+j)%4+i]*0x02)%256^((state[(i+0+j)%4+i]>>7==1)?0x1b:0))^state[(i+0+j)%4+i])*0x02)%256^(((((state[(i+0+j)%4+i]*0x02)%256^((state[(i+0+j)%4+i]>>7==1)?0x1b:0))^state[(i+0+j)%4+i])>>7==1)?0x1b:0))^state[(i+0+j)%4+i])>>7==1)?0x1b:0))
							// 0x## * 0x0b
						^ ((((((((state[(i+1+j)%4+i]
									*0x02)%256^((state[(i+1+j)%4+i]>>7==1)?0x1b:0))
									*0x02)%256^((((state[(i+1+j)%4+i]*0x02)%256^((state[(i+1+j)%4+i]>>7==1)?0x1b:0))>>7==1)?0x1b:0))
									^state[(i+1+j)%4+i])
									*0x02)%256^(((((((state[(i+1+j)%4+i]*0x02)%256^((state[(i+1+j)%4+i]>>7==1)?0x1b:0))*0x02)%256^((((state[(i+1+j)%4+i]*0x02)%256^((state[(i+1+j)%4+i]>>7==1)?0x1b:0))>>7==1)?0x1b:0))^state[(i+1+j)%4+i])>>7==1)?0x1b:0))
									^state[(i+1+j)%4+i])
							// 0x## * 0x0d
						^ ((((((((state[(i+2+j)%4+i]
									*0x02)%256^((state[(i+2+j)%4+i]>>7==1)?0x1b:0))
									^state[(i+2+j)%4+i])
									*0x02)%256^(((((state[(i+2+j)%4+i]*0x02)%256^((state[(i+2+j)%4+i]>>7==1)?0x1b:0))^state[(i+2+j)%4+i])>>7==1)?0x1b:0))
									*0x02)%256^(((((((state[(i+2+j)%4+i]*0x02)%256^((state[(i+2+j)%4+i]>>7==1)?0x1b:0))^state[(i+2+j)%4+i])*0x02)%256^(((((state[(i+2+j)%4+i]*0x02)%256^((state[(i+2+j)%4+i]>>7==1)?0x1b:0))^state[(i+2+j)%4+i])>>7==1)?0x1b:0))>>7==1)?0x1b:0))
									^state[(i+2+j)%4+i])
							// 0x## * 0x09
						^ (((((((state[(i+3+j)%4+i]
									*0x02)%256^((state[(i+3+j)%4+i]>>7==1)?0x1b:0))						
									*0x02)%256^((((state[(i+3+j)%4+i]*0x02)%256^((state[(i+3+j)%4+i]>>7==1)?0x1b:0))>>7==1)?0x1b:0))
									*0x02)%256^((((((state[(i+3+j)%4+i]*0x02)%256^((state[(i+3+j)%4+i]>>7==1)?0x1b:0))*0x02)%256^((((state[(i+3+j)%4+i]*0x02)%256^((state[(i+3+j)%4+i]>>7==1)?0x1b:0))>>7==1)?0x1b:0))>>7==1)?0x1b:0))
									^state[(i+3+j)%4+i]);
			}
		}
		for (var i = 0; i < result.length; i++)
		{
			state[i] = result[i];
		}
	}

	#tRotWord(key_schadule)
	{
		var temp = key_schadule[0];
		var i = 0;
		while (i < key_schadule.length-1)
		{
			key_schadule[i] = key_schadule[i+1];
			i++;
		}
		key_schadule[i] = temp;
	}

	#tSubWord(key_schadule)
	{
		this.#tSubByte(key_schadule);
	}

	#tXOR(array0, array1)
	{
		if (array0.length == array1.length)
		{
			for (var i = 0; i < array0.length; i++)
			{
				array0[i] ^= array1[i];
			}
		}
		else 
		{
			console.log('Both of length is different');
		}
	}

	#addPadding(text)
	{
		if (typeof text != 'string')
		{
			return null;
		}
		var x = this.#Nb*4-(text.length%(this.#Nb*4));
		for (var i = 0; i < x; i++)
		{
			text += String.fromCharCode(x);
		}
		return text;
	}

	#removePadding(text)
	{
		if (typeof text != 'string')
		{
			return null;
		}
		var x = text.length-1;
		var last_value = text.charCodeAt(x);
		var counter = 0;
		while (text.charCodeAt(x-1) == last_value)
		{
			x--;
			counter++;
		}
		if (text.charCodeAt(x) == counter+1)
		{
			text = text.substring(0, text.length-(counter+1));
		}
		return text;
	}
}