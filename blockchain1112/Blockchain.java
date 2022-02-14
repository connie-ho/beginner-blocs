import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import java.io.*;
import java.lang.reflect.Type;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.security.*;
import java.security.spec.X509EncodedKeySpec;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.PriorityBlockingQueue;

// main class used to get arguments
public class Blockchain {
    public static void main(String[] arguments) {


        int processID;
        if (arguments.length < 1) {
            processID = 0;
        }
        String argid;
        argid = arguments[0];

        // generate 3 processes given the argument
        while (true){
            if (argid.equals("0")){
                processID = 0;
                break;
            }
            else if (argid.equals("1")){
                processID = 1;
                break;
            }
            else if (argid.equals("2")){
                processID = 2;
                break;
            }
            else {
                // System.out.println(argid);
                processID = 0;
                break;
            }
        }
        bcSolver bcTtd = new bcSolver(processID);// keep bcsolver isolated with functionality
    }
}

// Block record class
class BlockRecord implements Serializable {
    private UUID BlockUUID;
    public UUID getBlockUUID() {return BlockUUID;}
    public void setBlockUUID (UUID ud){this.BlockUUID = ud;}

    private String BlockID;
    public String getBlockID() {return BlockID;}
    public void setBlockID(String BID){this.BlockID = BID;}

    private String SignedBlockID;
    public String getSignedBlockID() {return SignedBlockID;}
    public void setSignedBlockID(String SignedBlockID){this.SignedBlockID = SignedBlockID;}

    private String TimeStamp;
    public String getTimeStamp() {return TimeStamp;}
    public void setTimeStamp(String TS){this.TimeStamp = TS;}

    private String blockNumber;
    public String getBlockNumber() {return blockNumber;}
    public void setBlockNumber(String blockNumber) {this.blockNumber = blockNumber;}

    private String Fname;
    public String getFname() {return Fname;}
    public void setFname (String FN){this.Fname = FN;}

    private String Lname;
    public String getLname() {return Lname;}
    public void setLname (String LN){this.Lname = LN;}

    private String DOB;
    public String getDOB() {return DOB;}
    public void setDOB (String RS){this.DOB = RS;}

    private String SSNum;
    public String getSSNum() {return SSNum;}
    public void setSSNum (String SS){this.SSNum = SS;}

    private String Diag;
    public String getDiag() {return Diag;}
    public void setDiag (String D){this.Diag = D;}

    private String Treat;
    public String getTreat() {return Treat;}
    public void setTreat (String Tr){this.Treat = Tr;}

    private String Rx;
    public String getRx() {return Rx;}
    public void setRx (String Rx){this.Rx = Rx;}

    private String hashMaker; // declaring hash signed creator variable
    public String getHashMaker() {return hashMaker;}
    public void setHashMaker(String hashMaker) {this.hashMaker = hashMaker;}

    private String hashSignedMaker; // Used to store signed hash value after the process has solved the 'Work' puzzle
    public String getHashSignedMaker() {return hashSignedMaker;}
    public void setHashSignedMaker(String hashSignedMaker) {this.hashSignedMaker = hashSignedMaker;}

    private String lastWinHash; // We'll copy from previous block
    public String getlastWinHash() {return this.lastWinHash;}
    public void setlastWinHash (String PH){this.lastWinHash = PH;}

    private String winHash;
    public String getwinHash() {return winHash;}
    public void setwinHash (String WH){this.winHash = WH;}

    private String winSignedHash; // declaring random seed variable
    public String getWinningSignedHash() {return winSignedHash;}
    public void setWinningSignedHash(String winSignedHash) {this.winSignedHash = winSignedHash;}


    private String RandomSeed; // Our guess. Ultimately our winning guess.
    public String getRandomSeed() {return RandomSeed;}
    public void setRandomSeed (String RS){this.RandomSeed = RS;}

    private String VerificationProcess;
    public String getVerificationProcess() {return VerificationProcess;}
    public void setVerificationProcess(String VID){this.VerificationProcess = VID;}

    private String generationProcess;
    public String getProcessCreation() {return generationProcess;}
    public void setProcessCreation(String generationProcess) {this.generationProcess = generationProcess;}

//    private String brdata;
//    public void setData(String DATA){this.brdata = DATA;}


    @Override
    public String toString() {

        return "BlockRecord{" +
                "BlockID='" + BlockID + '\'' +
                ", SignedBlockID='" + SignedBlockID + '\'' +
                ", TimeStamp='" + TimeStamp + '\'' +
                ", blockNumber='" + blockNumber + '\'' +
                ", Fname='" + Fname + '\'' +
                ", Lname='" + Lname + '\'' +
                ", DOB='" + DOB + '\'' +
                ", SSNum='" + SSNum + '\'' +
                ", Diag='" + Diag + '\'' +
                ", Treat='" + Treat + '\'' +
                ", Rx='" + Rx + '\'' +
                ", hashMaker='" + hashMaker + '\'' +
                ", hashSignedMaker='" + hashSignedMaker + '\'' +
                ", lastWinHash='" + lastWinHash + '\'' +
                ", winHash='" + winHash + '\'' +
                ", winSignedHash='" + winSignedHash + '\'' +
                ", RandomSeed='" + RandomSeed + '\'' +
                ", VerificationProcess='" + VerificationProcess + '\'' +
                ", generationProcess='" + generationProcess + '\'' +
                ", BlockUUID=" + BlockUUID +
                '}';
    }
}


class bcSolver {
    public static int beginServerPort;
    public static int PKserverPort;
    public static int UVBserverPort;
    public static int portBCServer;

    public static int processID;
    public static int processAmount = 3;
    public static String currentServer = "localhost";
    public static boolean isbegin = false; // bool variable to check if all processes are able to execute
    public static boolean publicKeyInit = false; // when initiate 3 public keys(publicKeyAmount=3), it becomes true
    public static int publicKeyAmount = 0;
    public static KeyPair keypairs;
    public static PublicKey[] pklist = new PublicKey[processAmount]; // store 3 public keys from 3 processes

    // priority blocking queue(PBQ) used to store unverified blocks
    public static final PriorityBlockingQueue<BlockRecord> PBQ = new PriorityBlockingQueue<>(50, new BlockComparator());
    public static LinkedList<BlockRecord> VBLedger = new LinkedList<>(); // store verified blocks
    public static LinkedList<BlockRecord> UVBList = new LinkedList<>(); // store unverified block records

    
    public bcSolver(int processID) {
        bcSolver.processID = processID;
        bcSolver.beginServerPort = 4600 + processID;
        bcSolver.PKserverPort = 4710 + processID;
        bcSolver.UVBserverPort = 4820 + processID;
        bcSolver.portBCServer = 4930 + processID;

        System.out.println("\nRunning now\n");
        System.out.println("Clark Elliott's Block Coordination Framework. Use Control-C to stop the process.\n");
        System.out.println("Using processID " + Integer.toString(processID) + "\n");

        new Thread(new beginServer()).start();// start main thread to begin 3 processes
        new Thread(new PKserver()).start();// start PKserver thread to get public keys
        new Thread(new UVBserver(PBQ)).start();// start UVBserver to get unverified blocks
        new Thread(new UBserver()).start();// start UBserver to get blocks and add to ledger

        startSleep(2000);  // sleep for 2 seconds in case some processes is inactive

        if (processID == 2) {
            sendStart2server();            // process 2 is in charge of sending start signal to other processes
        }

        // build keyPair
        try {
            keypairs = generateKeyPair(999);
        } catch (Exception e) {
            // print the error as e
            e.printStackTrace();
        }

//        System.out.println("=======================Key Pair generated======================");

        while (!isbegin) {
            // wait for 1 second to allow every process initiated
            startSleep(1000);
        }

        sendPK2server(); // broadcast public keys to each processes
//        System.out.println("=======================Key Pair broadcast finished ======================");

        while (!publicKeyInit) {
            // sleep for 1 second if public key has not been initiated
            startSleep(1000);
        }

        if (processID == 0) {
            initiateBlock(); // process 0 is in charge of creating first block(dummy entry)
        }
//        System.out.println("=======================dummy entry generated======================");


        readBlockInput(); // read blockinput + pid.txt
        //        System.out.println("=======================all unverified block have been sent======================");


        sendUVBtoServer(); // send unverified blocks to 3 processes
        //        System.out.println("=======================all unverified block have been sent======================");

        startSleep(2000);

        new Thread(new puzzleSolver(PBQ)).start();// start puzzle solver server for each processes
        startSleep(21000);

//        System.out.println("====================================================================================");
        System.out.println("====================================================================================\n" +
                "BlockchainLedger.json is completed.\n" +
                "Please try the following console commands:\n" +
                "    - C (Credit used for checking which process has verified each block.)\n" +
                "    - V (Verify the block record as well as display any possible errors.)\n" +
                "    - L (List information on each block record on a single line.)\n" +
                "====================================================================================");
//        System.out.println("====================================================================================");

        while (true) {
            System.out.println("\nInput a command here:");
            // get input command using scanner
            Scanner scanner = new Scanner(System.in);
            String cmd = scanner.nextLine();

            switch (cmd) {
                case "C":
                    Credit();
                    break;
                case "V":
                    Verify();
                    break;
                case "L":
                    ListVB();
                    break;
            }
        }
    }

    // List each verified blocks data on a single line.
    private void ListVB() {
        try {
            // store BlockchainLedger.json data into temporary block record(tempBR) in LinkedList format
            LinkedList<BlockRecord> tempBR;
            Reader ledger = new FileReader("BlockchainLedger.json");
            Type tokenType = new TypeToken<LinkedList<BlockRecord>>() {
            }.getType();
            Gson gsonbuilder = new Gson();
            tempBR = gsonbuilder.fromJson(ledger, tokenType); // store ledger records

            Iterator<BlockRecord> it = tempBR.iterator();
            int count = tempBR.size();
            while (it.hasNext()) {
                BlockRecord iteratorRec = it.next();
                String liststr;
                liststr = count + ". " + iteratorRec.getTimeStamp() + " " + iteratorRec.getFname() + " " + iteratorRec.getLname() + " " +
                        iteratorRec.getDOB() + " " + iteratorRec.getSSNum() + " " + iteratorRec.getDiag() + " " + iteratorRec.getTreat()
                        + " " + iteratorRec.getRx() + "\n";
                System.out.printf(liststr);
                count--;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Verify the block record as well as display any possible errors
    private void Verify() {
        boolean verifyFlag = false;
        String blocknumber = "1";
        try {
            // store BlockchainLedger.json data into temporary block record(tempBR) in LinkedList format
            LinkedList<BlockRecord> tempBR;
            Reader ledger = new FileReader("BlockchainLedger.json");
            Type tokenType = new TypeToken<LinkedList<BlockRecord>>() {
            }.getType();
            // build gsonbuilder
            Gson gsonbuilder = new Gson();
            tempBR = gsonbuilder.fromJson(ledger, tokenType); // store ledger records

            for (BlockRecord br : tempBR) {
                blocknumber = br.getBlockNumber();
                if (!blocknumber.equals("1")) // except for the initial block
                {
                    String brStr = br.getBlockID() + br.getFname() + br.getLname() + br.getSSNum() +
                            br.getDOB() + br.getDiag() + br.getTreat() + br.getRx() + br.getProcessCreation();
                    try {
                        String conbr = brStr + br.getlastWinHash() + br.getRandomSeed();

                        // generate a new winning hash in byte format
                        MessageDigest MD = MessageDigest.getInstance("SHA-256");
                        byte[] bytesHashed = MD.digest(conbr.getBytes(StandardCharsets.UTF_8));
                        //convert hash value from bytes[] into string format
                        String hashstr = puzzleSolver.getStr(bytesHashed);
                        // verify if hashstr match this block's winning hash value
                        if (!hashstr.equals(br.getwinHash())) {
                            System.out.println("Block " + blocknumber + " invalid: SHA256 hash does not match.\n");
                            verifyFlag = true;
                            break;
                        }

                        // check if work number < 20000 to verify the puzzle solved successfully
                        int wnum = Integer.parseInt(hashstr.substring(0, 4), 16);
                        if (!(wnum < 20000)) {
                            System.out.println("Block " + blocknumber + "invalid: SHA256 confirmed, but does not meet the work threshold\n");
                            verifyFlag = true;
                            break;
                        }

                        // validate the signed-sha 256 signature using public key
                        try {
                            // check if winning hash verfied
                            boolean hashVerified = verifySignature(br.getwinHash().getBytes(),
                                    pklist[Integer.parseInt(br.getVerificationProcess())],
                                    Base64.getDecoder().decode(br.getWinningSignedHash()));
                            if (!hashVerified) {
                                System.out.println("Block " + blocknumber + " invalid: signature does not match the verifying process");
                                verifyFlag = true;
                                break;
                            }

                            // validate the signed block ID using the public key
                            boolean isBlockIDVerified = verifySignature(br.getBlockID().getBytes(),
                                    pklist[Integer.parseInt(br.getProcessCreation())],
                                    Base64.getDecoder().decode(br.getSignedBlockID()));
                            if (!isBlockIDVerified) {
                                System.out.println("#BlockID: " + blocknumber + " invalid: Signature verified, but DataHash field does not match local records. Secret key exposed?");
                                verifyFlag = true;
                                break;
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        String blockamount = bcSolver.VBLedger.get(0).getBlockNumber();
        if (verifyFlag) {
            int bn = Integer.parseInt(blocknumber) - 1;
            System.out.println("Block 1-" + Integer.toString(bn) + " have been verified." +
                    "\nBlock " + bn + "-" + blockamount + " follow an invalid block.");
        } else {
            System.out.println("Block 1-" + blockamount + " have been verified.");
        }
    }

    // check which process verified which block and display them in a line
    private void Credit() {
        try {
            Type tokenType = new TypeToken<LinkedList<BlockRecord>>() {
            }.getType();

            // get the temporary block record
            Gson gsonbuilder = new Gson();
            LinkedList<BlockRecord> tempBR;
            Reader ledger = new FileReader("BlockchainLedger.json");
            tempBR = gsonbuilder.fromJson(ledger, tokenType);

            int[] scores = new int[processAmount];// use scores array to store the credit score for each process
            // count the number of credit in each process by looping through the list
            for (BlockRecord br : tempBR) {
                if (br.getVerificationProcess() != null) {
                    int processNumber = Integer.parseInt(br.getVerificationProcess());
                    scores[processNumber]++;
                }
            }
            System.out.println("Verification Credit: P0=" + scores[0] + ", P1=" + scores[1] + ", P2=" + scores[2]);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // send unverified blocks to every process.
    public void sendUVBtoServer() {
        Socket sock;
        PrintStream sendStream;
        BlockRecord iBR;
        Iterator<BlockRecord> iter = UVBList.iterator();
        try {
            while (iter.hasNext()) {
                iBR = iter.next();
                String BR = getJSON(iBR);
                for (int i = 0; i < processAmount; i++) {
                    sock = new Socket(currentServer, 4820 + i);
                    sendStream = new PrintStream(sock.getOutputStream());
                    sendStream.println(BR);
                    System.out.println("Sending UVBs to process " + Integer.toString(i) + "...");
                    sendStream.flush();
                    sock.close();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void startSleep(int sleeptime) {
        try {
            Thread.sleep(sleeptime);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // check if the input block record already exist in ledger
    public static boolean checkExist(BlockRecord BRinput) {
        BlockRecord brinput = BRinput;
        for (BlockRecord iter : VBLedger) {
            if (brinput.getBlockID().equals(iter.getBlockID()))
                return true;
        }
        return false;
    }

    // get Public key pairs and private key pairs
    // code source from professor Elliott
    public static KeyPair generateKeyPair(long seed) throws Exception {
        // build RSA(Digital Signature) generator object
        KeyPairGenerator RSAkeyBuilder = KeyPairGenerator.getInstance("RSA");

        // set random seed options for a SecureRandom object
        SecureRandom securerandom = SecureRandom.getInstance("SHA1PRNG", "SUN");
        securerandom.setSeed(seed);

        // Initialize RSA Builder by setting the keysize and securerandom
        RSAkeyBuilder.initialize(1024, securerandom);

        return (RSAkeyBuilder.generateKeyPair());
    }

    // send public keys to each process
    public void sendPK2server() {
        Socket pksock;
        PrintStream pksendStream;

        // get bytes format of public key
        byte[] pk = keypairs.getPublic().getEncoded();
        // get string format of pk bytes
        String strpk = Base64.getEncoder().encodeToString(pk);
        try {
            for (int i = 0; i < processAmount; i++) {
                pksock = new Socket(currentServer, 4710 + i);
                // apply outputstream on socket to send public keys
                pksendStream = new PrintStream(pksock.getOutputStream());

                // combine processID and string format of public key
                String pidpk = processID + " " + strpk;
                pksendStream.println(pidpk);

                pksendStream.flush();
                pksock.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // process2 send start signal to other processes
    public boolean sendStart2server() {
        Socket p2sock;
        PrintStream startstream;
        try {
            for (int i = 0; i < processAmount; i++) {
                p2sock = new Socket(currentServer, 4600 + i);
                startstream = new PrintStream(p2sock.getOutputStream());
                startstream.println("start");// sending 'start' message
                startstream.flush();// flushes the output stream
                p2sock.close();
            }
            System.out.println("process2 has sent Start Signal to other processes");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return true;
    }

    // create the first Block(FB) dummy block
    public static void initiateBlock() {
        BlockRecord FB = new BlockRecord();

        // set random UUID for FB
        String setBlockUUID = UUID.randomUUID().toString();
        FB.setBlockID(setBlockUUID);

        // set timeStamp for FB
        String pattern = "yyyy-MM-dd.HH:mm:ss";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        String date0 = simpleDateFormat.format(new Date());
        String timestamp = String.valueOf(date0) + "." + processID;// add process id in case of multiple block records share the same time
        FB.setTimeStamp(timestamp);

        // set other fields for FB
        FB.setFname("Kevin");
        FB.setLname("Li");
        FB.setSSNum("123-45-1661");
        FB.setDOB("1950.07.13");
        FB.setDiag("Nearsighted");
        FB.setTreat("ReduceComputerUsage");
        FB.setRx("Glasses");
        FB.setlastWinHash("1111111111");
        FB.setBlockNumber("1");

        // set string block record for FB
        String FBrecord = FB.getBlockID() + FB.getFname();
        FBrecord += FB.getLname() + FB.getSSNum() + FB.getDOB();
        FBrecord += FB.getDiag() + FB.getTreat() + FB.getRx();
        try {
            // set winning hash value for FB
            String SHA256value = getSHA256(FBrecord);
            FB.setwinHash(SHA256value);

            // add first block to verified blockchain ledger
            VBLedger.add(0, FB);
            System.out.println(VBLedger.size());

            // write first block record to ledger
            if (processID == 0) {
                updateVB2Server(FB);
                write2json();
                System.out.println("The first verified block(dummy block) has been broadcast to each process server");
            }
        } catch (Exception exp) {
            exp.printStackTrace();
        }
    }

    // send verified block to each process server
    public static void updateVB2Server(BlockRecord BR) {
        try {
            PrintStream sendStream;
            Socket SendSock;
            for (int i = 0; i < processAmount; i++) {
                SendSock = new Socket(currentServer, 4930 + i); // set ports of verified block servers
                sendStream = new PrintStream(SendSock.getOutputStream());

                // get json for BR and send to stream
                sendStream.println(getJSON(BR));
                sendStream.flush();
                SendSock.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // send unverified block to each process server
    public static void updateUVB2Server(BlockRecord BR) {
        try {
            PrintStream sendStream;
            Socket SendSock;
            for (int j = 0; j < processAmount; j++) {
                SendSock = new Socket(currentServer, 4820 + j);// set ports of unverified block servers
                sendStream = new PrintStream(SendSock.getOutputStream());
                sendStream.println(getJSON(BR));
                sendStream.flush();
                SendSock.close();
            }
        } catch (IOException e) {

            e.printStackTrace();
        }
    }

    // return json of a block record
    public static String getJSON(BlockRecord blockinput) {
        // create Gson object
        Gson ppGson = new GsonBuilder().setPrettyPrinting().create();
        // convert the input block to string format
        String json = ppGson.toJson(blockinput);
        return json;
    }

    // read input block files and create the according unverified block for each row data
    public static void readBlockInput() {
        String blockinput = String.format("BlockInput%d.txt", processID);
        try {
            // read file BlockInput.txt as an input variable
            BufferedReader input = new BufferedReader(new FileReader(blockinput));
            String[] inputsplit;
            String Buuid;
            String inputString;

            try {
                while ((inputString = input.readLine()) != null) {
                    String pattern = "yyyy-MM-dd.HH:mm:ss";
                    SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
                    String date0 = simpleDateFormat.format(new Date());
                    String timestamp = String.valueOf(date0) + "." + processID;// add process id in case of multiple block records share the same time

                    Buuid = UUID.randomUUID().toString(); // set random block uuid
                    BlockRecord BR = new BlockRecord();
                    inputsplit = inputString.split(" +");
                    String sBlock = "";
                    try {
                        // sign digital signature for the block
                        byte[] signature1 = signSRA(Buuid.getBytes(), keypairs.getPrivate());

                        // sBlock(signed Block) used to store Base64 encoded digital signature
                        sBlock = Base64.getEncoder().encodeToString(signature1);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }

                    BR.setBlockID(Buuid);
                    BR.setTimeStamp(timestamp);
                    BR.setSignedBlockID(sBlock);
                    BR.setProcessCreation(String.valueOf(processID));
                    BR.setFname(inputsplit[0]);
                    BR.setLname(inputsplit[1]);
                    BR.setSSNum(inputsplit[3]);
                    BR.setDOB(inputsplit[2]);
                    BR.setDiag(inputsplit[4]);
                    BR.setTreat(inputsplit[5]);
                    BR.setRx(inputsplit[6]);
                    UVBList.add(BR);

                    // get hash value of the block record
                    String BRStr = BR.getBlockID() + BR.getFname() + BR.getLname() + BR.getSSNum() + BR.getDOB() + BR.getDiag() + BR.getTreat() + BR.getRx() + BR.getProcessCreation();
                    String hash256value = getSHA256(BRStr);

                    // use SHA256 and private key pairs to sign unverified blocks
                    String signatureHashed = "";
                    try {
                        // set up byte array to store signatures
                        byte[] signature2 = signSRA(hash256value.getBytes(), keypairs.getPrivate());
                        // hash the signature
                        signatureHashed = Base64.getEncoder().encodeToString(signature2);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    BR.setHashMaker(hash256value);
                    BR.setHashSignedMaker(signatureHashed);

                    startSleep(1000);
                    // start sleeping for 1 second
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }

    // apply SHA256 hash algorithm on strBR(block record in string format)
    private static String getSHA256(String strBR) {
        String hash256value = "";
        try {
            MessageDigest MD = MessageDigest.getInstance("SHA-256");
            MD.update(strBR.getBytes());
            byte[] bytedata = MD.digest();

            StringBuffer hexadecimalStr = new StringBuffer();
            for (byte bd : bytedata) {
                // add to hexadecimalStr byte by byte
                hexadecimalStr.append(Integer.toString((bd & 0xff) + 0x100, 16).substring(1));
            }
            hash256value = hexadecimalStr.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return hash256value;
    }

    // use private key to sign bytes data
    // code from professor Elliott
    public static byte[] signSRA(byte[] bydata, PrivateKey pkey)
            throws Exception {
        Signature signBuilder = Signature.getInstance("SHA1withRSA");
        signBuilder.initSign(pkey);
        signBuilder.update(bydata);
        return (signBuilder.sign());
    }

    // part of verification: check if it is signed by key pairs
    public static boolean verifySignature(byte[] bydata, PublicKey pk, byte[] decode)
            throws Exception {
        Signature signBuilder = Signature.getInstance("SHA1withRSA");
        signBuilder.initVerify(pk);
        signBuilder.update(bydata);
        return (signBuilder.verify(decode));
    }

    // put verified blocks into BlockchainLedger.json
    public static void write2json() {
        // build ppGson object
        Gson ppGson = new GsonBuilder().setPrettyPrinting().create();
        // convert ppGson to string
        String json = ppGson.toJson(bcSolver.VBLedger);
        try (FileWriter jsonValue = new FileWriter("BlockchainLedger.json")) {
            ppGson.toJson(bcSolver.VBLedger, jsonValue);
            // write in to BlockchainLedger.json file
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}


// Comparator code provided by Prof. Elliott used to organize blocks by timestamp
class BlockComparator implements Comparator<BlockRecord> {
    @Override
    public int compare(BlockRecord br1, BlockRecord br2) {
        String ts1 = "";
        String ts2 = "";
        try {
            ts1 = br1.getTimeStamp();
            ts2 = br2.getTimeStamp();
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (ts1 == null){
            return -1;
        }
        else if (ts1.equals(ts2)){
            return 0;
        }
        else if (ts2 == null){
            return 1;
        }
        else{
            return ts1.compareTo(ts2);
        }
    }
}

// main server is to help to start every process though flipping the isbegin
class beginServer implements Runnable {
    public void run() {
        Socket mainsock;
        try {
            // at most 6 incoming request can be stored in queue
            ServerSocket serverSocket = new ServerSocket(bcSolver.beginServerPort, 6);

            while (true) {
                mainsock = serverSocket.accept();
                try {
                    // read input in buffer
                    BufferedReader input = new BufferedReader(new InputStreamReader(mainsock.getInputStream()));

                    // received input and then set isbegin to be true
                    String strinput = input.readLine();
                    bcSolver.isbegin = true;
                    mainsock.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

// public key = public key + processID
class PKserver implements Runnable {
    // processing public keys
    public void run() {
        Socket pkssock;
        // key server starts and will broadcast and receive public keys
        System.out.println("Starting Key Server input thread using " + bcSolver.PKserverPort);
        try {
            ServerSocket ssock = new ServerSocket(bcSolver.PKserverPort, 6);
            while (true) {
                pkssock = ssock.accept();
                try {
                    // read input data into buffer
                    BufferedReader input = new BufferedReader(new InputStreamReader(pkssock.getInputStream()));
                    String[] inputsplit = input.readLine().split(" ");
                    int processID = Integer.parseInt(inputsplit[0]);
                    // get process id in int format

                    byte[] publicKeyB = Base64.getDecoder().decode(inputsplit[1]);
                    // decode public key that stored in position 1 using Base64 and get the byte format PK

                    // build public spec
                    X509EncodedKeySpec pubbuilder = new X509EncodedKeySpec(publicKeyB);
                    PublicKey keytolist = KeyFactory.getInstance("RSA").generatePublic(pubbuilder);

                    // store public key in position processID in pklist
                    bcSolver.pklist[processID] = keytolist;

                    System.out.println("Got key: Process" + Integer.toString(processID));

                    // increase the amount of public key
                    bcSolver.publicKeyAmount++;
                    if (bcSolver.publicKeyAmount == 3) {
                        bcSolver.publicKeyInit = true;
                        // once the amount of public key is 3, we finished the initiation of public key
                    }
                    pkssock.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

// Unverified Block Server receives blocks from each process
class UVBserver implements Runnable {
    PriorityBlockingQueue<BlockRecord> PBQ;
    // build a priority block queue(PBQ) for BlockRecord type object

    public UVBserver(PriorityBlockingQueue<BlockRecord> PBQ) {
        this.PBQ = PBQ;
    }

    @Override
    public void run() {
        Socket UVBSocket;
        System.out.println("Starting the Unverified Block Server input thread using " + bcSolver.UVBserverPort);
        try {
            // set up socket for the unverified block server(UVBserver)
            ServerSocket UVBserver = new ServerSocket(bcSolver.UVBserverPort, 6);
            while (true) {
                UVBSocket = UVBserver.accept();
                try {
                    // Read input in buffer
                    BufferedReader inputData = new BufferedReader(new InputStreamReader(UVBSocket.getInputStream()));

                    // Store input into strBuffer
                    Gson gsonbuilder = new Gson();
                    StringBuffer strBuffer = new StringBuffer();

                    String inputString;
                    while ((inputString = inputData.readLine()) != null) {
                        strBuffer.append(inputString);
                    }

                    // put strBuffer in json format into Block Record brInput
                    BlockRecord brInput = gsonbuilder.fromJson(strBuffer.toString(), BlockRecord.class);

                    System.out.println("Received UVB:  " + brInput.getTimeStamp() + " (BlockID:" + brInput.getBlockID().toString() + " from P" + brInput.getProcessCreation() + ")");

                    // put the received block record into our PBQ(Priority Block Queue)
                    bcSolver.PBQ.put(brInput);

                    UVBSocket.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}


// UBlockChain Server receives verified blocks and adds verified block into Ledger
class UBserver implements Runnable {
    @Override
    public void run() {
        Socket bcSocket;
        System.out.println("Starting the Blockchain server input thread using " + bcSolver.portBCServer);
        try {
            ServerSocket servsock = new ServerSocket(bcSolver.portBCServer, 6);
            while (true) {
                bcSocket = servsock.accept();
                try {
                    // Read buffinput in buffer
                    BufferedReader buffinput = new BufferedReader(new InputStreamReader(bcSocket.getInputStream()));
                    StringBuffer brDatas = new StringBuffer();
                    String brData;
                    // Store buffinput into strBuffer
                    Gson gsonbuilder = new Gson();

                    while ((brData = buffinput.readLine()) != null) {
                        brDatas.append(brData);
                    }

                    // put strBuffer in json format into Block Record brInput
                    BlockRecord BRinput = gsonbuilder.fromJson(brDatas.toString(), BlockRecord.class);

                    // check if this block already exist in ledger
                    // if not then add into ledger
                    if (!bcSolver.checkExist(BRinput)) {
                        bcSolver.VBLedger.add(0, BRinput);
                    }

                    if (bcSolver.processID == 0) {
                        bcSolver.write2json(); // write the ledger to json
                    }
                    bcSocket.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        } catch (Exception ioe) {
            ioe.printStackTrace();
        }
    }
}


class puzzleSolver implements Runnable {

    // get string format of byte object
    public static String getStr(byte[] inputbyte) {
        int inputlen = inputbyte.length * 2;
        StringBuilder builder = new StringBuilder(inputlen);
        for (byte i_byte : inputbyte) {
            builder.append(String.format("%02X", i_byte));
        }
        return builder.toString();
    }

    // only use numbers and alpha to create random string
    private static final String NumAlpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    BlockingQueue<BlockRecord> BQ;
    public puzzleSolver(PriorityBlockingQueue<BlockRecord> PBQ) {
        this.BQ = PBQ;
    }

    @Override
    public void run() {
        try {
            while (true) {
                BlockRecord BR = bcSolver.PBQ.take(); // take a block from record from PBQ

                if (bcSolver.checkExist(BR) && BR != null) {
//                    System.out.println("This Block Record already exists in ledger.");
                    continue;
                }

                // check if the signed BlockID is verified
                boolean isBlockIDVerified = bcSolver.verifySignature(BR.getBlockID().getBytes(),
                        bcSolver.pklist[Integer.parseInt(BR.getProcessCreation())],
                        Base64.getDecoder().decode(BR.getSignedBlockID()));
                if (!isBlockIDVerified){
                    System.out.println("Block#" + BR.getBlockID() + " is not verified");
                }

                // check if the signed BlockID is hash verified
                boolean hashVerified = bcSolver.verifySignature(BR.getHashMaker().getBytes(),
                        bcSolver.pklist[Integer.parseInt(BR.getProcessCreation())],
                        Base64.getDecoder().decode(BR.getHashSignedMaker()));
                if (!hashVerified){
                    System.out.println("Block#" + BR.getBlockID() + " is not hash signed");
                }

                String BRStr = BR.getBlockID() + BR.getFname() + BR.getLname() + BR.getSSNum() + BR.getDOB() + BR.getDiag()
                        + BR.getTreat() + BR.getRx() + BR.getProcessCreation() + bcSolver.VBLedger.get(0).getwinHash();
                String lastid = bcSolver.VBLedger.get(0).getBlockID(); // the block id before this one

                int wnum; // work number that used to determine whether the puzzle is solved
                String rstr; // random seed string(rstr)
                String crstr; // concatenated random seed string(crstr)
                String hstr; // hashed string(hstr)

                if (!bcSolver.checkExist(BR)) {
                    try {
                        // Maximum 20 attempts
                        for (int i = 1; i < 20; i++) {
                            // build random string, code provided by Prof. Elliott
                            StringBuilder sb = new StringBuilder();

                            int cc = 8;
                            while (cc-- != 0) {
                                int cha = (int) (Math.random() * NumAlpha.length());
                                sb.append(NumAlpha.charAt(cha));
                            }
                            // store rstr
                            rstr = sb.toString();

                            // build hash value for this Block
                            MessageDigest MD = MessageDigest.getInstance("SHA-256");
                            crstr = BRStr + rstr;
                            byte[] hashbytes = MD.digest(crstr.getBytes(StandardCharsets.UTF_8));
                            hstr = getStr(hashbytes);// Converting bytes into hash values in string format
                            System.out.println("Hash is: " + hstr);

                            // generate first16bits in Hex and Decimal
                            wnum = Integer.parseInt(hstr.substring(0, 4), 16);
                            // display on the terminal
                            System.out.println("First 16 bits in Hex and Decimal: " + hstr.substring(0, 4) + " and " + wnum);

                            if (wnum < 20000) {
                                // check if the Blockchain ledger has been upadated by checking the block id
                                if (!lastid.equals(bcSolver.VBLedger.get(0).getBlockID())) {
                                    bcSolver.updateUVB2Server(BR); // reverify this block record
                                }
                                else {
                                    System.out.println(wnum + " is less than 20,000 so puzzle solved!\n" +
                                            "The seed (puzzle answer) was: " + rstr + "\n");

                                    // set winning hash value, random seed string and last winning hash value for this block
                                    BR.setwinHash(hstr);
                                    BR.setRandomSeed(rstr);
                                    BR.setlastWinHash(bcSolver.VBLedger.get(0).getwinHash());

                                    // set block number of this block by incrementing the last block number
                                    int bnum = Integer.parseInt(bcSolver.VBLedger.get(0).getBlockNumber()) + 1;
                                    BR.setBlockNumber(String.valueOf(bnum));

                                    // this process ID verified this BlockData
                                    BR.setVerificationProcess(String.valueOf(bcSolver.processID));
                                    System.out.println("\n[(Block#" + BR.getBlockNumber() + " from P" + BR.getProcessCreation() + ") verified by P" + BR.getVerificationProcess() + "\n");

                                    // use signature to verify the winning hash value
                                    byte[] sign = bcSolver.signSRA(hstr.getBytes(), bcSolver.keypairs.getPrivate());
                                    String hashedsign = Base64.getEncoder().encodeToString(sign);
                                    BR.setWinningSignedHash(hashedsign);

                                    // add this verified block to ledger and send to each the processes
                                    bcSolver.VBLedger.add(0, BR);
                                    bcSolver.updateVB2Server(BR);
                                    
                                    continue;
                                }
                                break;
                            }
                            else{
                                // wnum > 20000, display that puzzle has not been solved
                                System.out.format("%d is not less than 20,000 so we did not solve the puzzle\n\n", wnum);
                            }
                            if (bcSolver.checkExist(BR)) { 
                                // stop verifying if this block record has been verified
                                break;
                            }
                            bcSolver.startSleep(1200);
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}