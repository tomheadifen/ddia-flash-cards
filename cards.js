// Flashcards for Designing Data-Intensive Applications (1st edition).
// To add a card: append { q: "...", a: "..." } to a chapter's `cards` array.
// Answers support a tiny bit of markup: **bold**, `code`, and line breaks (\n).
window.DDIA = [
  {
    id: 1, part: "I. Foundations of Data Systems",
    title: "Reliable, Scalable, and Maintainable Applications",
    cards: [
      { q: "What three concerns does the book say matter most in software systems?", a: "**Reliability** (keeps working correctly under faults), **scalability** (reasonable ways to cope with growth), and **maintainability** (many people can work on it productively over time)." },
      { q: "Fault vs. failure?", a: "A **fault** is one component deviating from its spec. A **failure** is the system as a whole stopping providing the required service to the user. The goal of fault tolerance is to prevent faults from causing failures." },
      { q: "Why would you deliberately inject faults (e.g. Chaos Monkey)?", a: "Many critical bugs come from poor error handling. Triggering faults on purpose continuously exercises the fault-tolerance machinery, raising confidence that real faults will be handled." },
      { q: "Name the three broad categories of faults discussed.", a: "**Hardware faults** (disks, RAM, power — usually random and independent), **software errors** (systematic, correlated across nodes, e.g. a leap-second bug), and **human errors** (configuration mistakes are a leading cause of outages)." },
      { q: "Ways to reduce human error?", a: "Well-designed abstractions/APIs, sandbox environments, thorough testing, quick and easy rollback, gradual rollouts, detailed monitoring (telemetry), and good training." },
      { q: "What are 'load parameters'?", a: "Numbers that describe the load on a system, chosen to fit its architecture — e.g. requests/sec, read/write ratio, active users, cache hit rate." },
      { q: "Twitter home timeline: what were the two approaches, and which did they move to?", a: "1) On read, query and merge tweets of everyone you follow. 2) On write, **fan out** each tweet into followers' timeline caches. They moved to fan-out-on-write (reads far outnumber writes), then a hybrid: celebrities with huge follower counts are fetched at read time." },
      { q: "Why use percentiles rather than the mean for response time?", a: "The mean hides how many users actually experienced delay. The **median (p50)** shows the typical case; high percentiles (**p95, p99, p999**) — the *tail latencies* — show how bad outliers are." },
      { q: "What is tail latency amplification?", a: "When serving one request requires several backend calls in parallel, the slowest call determines the overall time — so a small fraction of slow backend calls affects a much larger fraction of end-user requests." },
      { q: "Head-of-line blocking (in the latency context)?", a: "A server can only process a few things in parallel, so a few slow requests hold up the ones queued behind them. This is why response time must be measured on the client side." },
      { q: "Scaling up vs. scaling out?", a: "**Scaling up (vertical):** a more powerful machine. **Scaling out (horizontal):** distribute load across many smaller machines (shared-nothing). Real systems usually mix both." },
      { q: "What is an elastic system?", a: "One that automatically adds computing resources when it detects load increasing (as opposed to manually scaled systems, which are simpler and have fewer surprises)." },
      { q: "Three design principles for maintainability?", a: "**Operability** (easy for ops to keep running), **simplicity** (remove accidental complexity, e.g. via good abstractions), **evolvability** (easy to change — also called extensibility or modifiability)." },
      { q: "Accidental vs. essential complexity?", a: "Accidental complexity isn't inherent to the problem users care about — it arises only from the implementation. Abstraction is a key tool for removing it." }
    ]
  },
  {
    id: 2, part: "I. Foundations of Data Systems",
    title: "Data Models and Query Languages",
    cards: [
      { q: "What is 'impedance mismatch' in the data-model context?", a: "The awkward translation layer needed between objects in application code and the tables/rows/columns of a relational database. ORMs reduce the boilerplate but can't fully hide the differences." },
      { q: "Main arguments for the document model?", a: "Schema flexibility, better **locality** (whole document loaded at once), and closer fit to application data structures for tree-like, one-to-many data." },
      { q: "Main arguments for the relational model?", a: "Better support for **joins**, and for **many-to-one** and **many-to-many** relationships." },
      { q: "Schema-on-read vs. schema-on-write?", a: "**Schema-on-write** (relational): the schema is explicit and the DB enforces it on write. **Schema-on-read** (document): structure is implicit and only interpreted when data is read — like dynamic vs. static type checking." },
      { q: "Why normalize (e.g. store a region ID rather than the text 'Greater Seattle Area')?", a: "Avoids duplication: consistent style/spelling, easy updates in one place, localization support, and better search. The ID has no meaning to humans so it never needs to change." },
      { q: "What problem from the 1970s hierarchical model (IMS) resembles today's document databases?", a: "Good at one-to-many, but poor at many-to-many relationships and no joins — forcing a choice between duplicating data or manually resolving references." },
      { q: "CODASYL / network model: how were records accessed?", a: "By following **access paths** — pointer chains from a root record. Querying and changing the data model was hard because the application had to track these paths by hand." },
      { q: "Why is a declarative query language (SQL) easier to optimize than imperative code?", a: "It specifies *what* result pattern you want, not *how* to get it. The query optimizer can choose indexes, join orders and parallelism without the query changing." },
      { q: "What is MapReduce querying (as in MongoDB) in this chapter?", a: "A hybrid between declarative and imperative: you provide pure `map` and `reduce` functions, and the framework decides where and when to run them across the data." },
      { q: "Property graph model: what does a vertex and an edge contain?", a: "**Vertex:** unique ID, outgoing edges, incoming edges, properties (key-value). **Edge:** unique ID, tail vertex, head vertex, a label for the relationship, and properties." },
      { q: "Name three graph query languages from the chapter.", a: "**Cypher** (Neo4j, declarative property graphs), **SPARQL** (triple stores / RDF), and **Datalog** (older, foundation for later languages; rules built up from parts)." },
      { q: "What is a triple store?", a: "Stores data as three-part statements: (**subject, predicate, object**), e.g. (Jim, likes, bananas). The object is either a primitive value or another vertex." },
      { q: "When would you pick a graph model over a document or relational one?", a: "When anything is potentially related to anything — many-to-many relationships are the norm and you need to traverse variable-length paths." }
    ]
  },
  {
    id: 3, part: "I. Foundations of Data Systems",
    title: "Storage and Retrieval",
    cards: [
      { q: "What is the fundamental trade-off of indexes?", a: "Well-chosen indexes speed up reads, but every index slows down writes because it must be updated too. So databases don't index everything by default." },
      { q: "Describe a hash index (Bitcask-style).", a: "Append-only data file on disk + an in-memory hash map from each key to its byte offset. Reads: one seek. Limits: all keys must fit in memory; range queries are inefficient." },
      { q: "What are compaction and merging in log-structured storage?", a: "**Compaction** throws away duplicate keys in a segment, keeping only the most recent value. **Merging** combines several segments into one. Done in a background thread while reads use old segments." },
      { q: "Why append-only instead of overwriting in place?", a: "Sequential writes are much faster; crash recovery is simpler (no half-overwritten values); merging old segments avoids fragmentation." },
      { q: "What is an SSTable?", a: "**Sorted String Table**: a segment file where key-value pairs are sorted by key, each key appearing once. Merging is efficient (mergesort), you only need a sparse in-memory index, and blocks can be compressed." },
      { q: "How does an LSM-tree handle writes?", a: "Write to an in-memory balanced tree (**memtable**). When it gets big, flush it to disk as an SSTable. Reads check memtable, then newest to oldest segments. A write-ahead log protects the memtable against crashes." },
      { q: "How do LSM-trees avoid slow lookups for keys that don't exist?", a: "**Bloom filters** — a memory-efficient structure that can say definitively that a key is *not* in a segment, saving disk reads." },
      { q: "Size-tiered vs. leveled compaction?", a: "**Size-tiered:** newer, smaller SSTables are merged into older, larger ones (HBase, Cassandra option). **Leveled:** key range is split into smaller SSTables and older data moves to separate levels, compacting more incrementally (LevelDB, RocksDB)." },
      { q: "How does a B-tree organize data?", a: "Into fixed-size **pages** (often 4 KB), each holding keys and references to child pages covering key ranges. Updates overwrite pages in place. A tree with n keys has depth O(log n); branching factor is typically several hundred." },
      { q: "How do B-trees stay crash-safe?", a: "A **write-ahead log (WAL / redo log)**: every modification is appended to the log before pages are changed, so the tree can be restored to a consistent state after a crash. Latches protect concurrent access." },
      { q: "LSM-trees vs. B-trees: general performance rule of thumb?", a: "LSM-trees: typically **faster writes** (lower write amplification, sequential writes, better compression). B-trees: typically **faster, more predictable reads**, and each key exists in exactly one place (handy for transactional locks). Compaction can interfere with LSM latency at high percentiles." },
      { q: "What is write amplification?", a: "One write to the database causing multiple writes to disk over the DB's lifetime (e.g. WAL + page write, or repeated compaction). Matters a lot on SSDs and for write-heavy workloads." },
      { q: "Clustered index vs. heap file?", a: "A **heap file** stores rows in no particular order and the index holds references to them. A **clustered index** stores the row itself within the index (e.g. InnoDB primary key). A **covering index** stores some columns in the index." },
      { q: "OLTP vs. OLAP access patterns?", a: "**OLTP:** small number of records fetched by key, random-access low-latency writes from user input. **OLAP:** aggregate over huge numbers of records, bulk import (ETL) or event streams, used by analysts." },
      { q: "What is a star schema?", a: "A data-warehouse layout with a central **fact table** (each row an event, e.g. a sale) referencing **dimension tables** (who, what, where, when, how, why). A **snowflake schema** further breaks dimensions into sub-dimensions." },
      { q: "Why column-oriented storage for analytics?", a: "Queries typically touch a few columns of very wide tables. Storing each column separately means reading only what's needed, and columns compress very well (e.g. **bitmap encoding** with run-length encoding)." },
      { q: "How are writes handled in a column store?", a: "Sorted columns make in-place updates hard, so they use an LSM-like approach: writes go to an in-memory store, then are merged with column files on disk in bulk." },
      { q: "What is a data cube / materialized aggregate?", a: "A precomputed grid of aggregates (e.g. SUM) grouped by several dimensions. Makes certain queries very fast, but loses flexibility to query raw data on dimensions not in the cube." }
    ]
  },
  {
    id: 4, part: "I. Foundations of Data Systems",
    title: "Encoding and Evolution",
    cards: [
      { q: "Backward vs. forward compatibility?", a: "**Backward:** newer code can read data written by older code. **Forward:** older code can read data written by newer code (it must ignore additions it doesn't understand). Forward is usually the trickier one." },
      { q: "Why do you need both directions of compatibility during deployments?", a: "With **rolling upgrades** and client apps that users don't update, old and new code versions — and old and new data formats — coexist in the system at the same time." },
      { q: "Problems with language-specific serialization (Java Serializable, pickle)?", a: "Tied to one language, a security risk (can instantiate arbitrary classes), poor versioning support, and often inefficient." },
      { q: "Weaknesses of JSON/XML/CSV as encodings?", a: "Ambiguous number handling (JSON can't distinguish ints/floats; large ints lose precision), no binary strings (Base64 workaround), optional/complex schema support, and CSV has no schema at all." },
      { q: "How do Thrift and Protocol Buffers make encoded data compact?", a: "They require a schema and replace field names with numeric **field tags**, use variable-length integers, and pack types efficiently (Thrift CompactProtocol / Protobuf)." },
      { q: "Schema evolution rules for Protobuf/Thrift field tags?", a: "Never change a field's tag. New fields must be **optional** or have a default (for backward compat). You can remove only optional fields and must never reuse that tag number. Old code skips unknown tags (forward compat)." },
      { q: "How does Avro differ from Protobuf/Thrift?", a: "No field tags in the encoded data — just values concatenated. Decoding requires the exact **writer's schema**, which Avro resolves against the **reader's schema** by matching field names." },
      { q: "How does an Avro reader know the writer's schema?", a: "Depends on context: included once at the start of a large file (object container file), a schema **version number** stored with each DB record, or negotiated on connection setup for RPC." },
      { q: "Why is Avro friendly to dynamically generated schemas?", a: "Since there are no tag numbers, you can generate a schema from e.g. a database's relational schema and regenerate it when columns change, without manually assigning tags." },
      { q: "Three main modes of dataflow covered?", a: "Through **databases** (writer encodes, reader decodes later — 'data outlives code'), through **services** (REST/RPC), and through **asynchronous message passing** (brokers/actors)." },
      { q: "Why are RPC's 'make a network call look like a local function call' goals flawed?", a: "Network calls are unpredictable (can be lost, time out with unknown outcome), have variable latency, may need retries (idempotence), must encode parameters, and cross languages with different types." },
      { q: "Advantages of a message broker over direct RPC?", a: "Buffers when the recipient is unavailable, redelivers after crashes, sender needn't know recipient's address, one message can go to many recipients, and decouples sender from recipient (sender doesn't wait)." },
      { q: "What is the actor model?", a: "Logic is encapsulated in actors with local state, communicating via async messages (delivery not guaranteed). Distributed actor frameworks (Akka, Orleans, Erlang OTP) extend this across nodes." }
    ]
  },
  {
    id: 5, part: "II. Distributed Data",
    title: "Replication",
    cards: [
      { q: "Reasons to replicate data?", a: "Keep data geographically close to users (latency), keep working if parts fail (availability), and scale out read throughput." },
      { q: "Three main replication approaches?", a: "**Single-leader**, **multi-leader**, and **leaderless**." },
      { q: "Synchronous vs. asynchronous replication — trade-off?", a: "Synchronous guarantees the follower has an up-to-date copy, but any unresponsive follower blocks writes. Asynchronous never blocks but writes can be lost if the leader fails. **Semi-synchronous**: one follower sync, rest async." },
      { q: "How do you add a new follower without downtime?", a: "Take a consistent snapshot of the leader, copy it to the follower, then the follower requests all changes since the snapshot's position in the replication log (e.g. log sequence number / binlog coordinates) and catches up." },
      { q: "What can go wrong with automatic leader failover?", a: "Lost async writes if the new leader lagged; conflicts with external systems (GitHub's auto-increment incident); **split brain** (two nodes think they're leader); choosing the right timeout." },
      { q: "Four replication log implementations?", a: "**Statement-based** (breaks on nondeterministic functions like NOW()), **WAL shipping** (couples to storage engine version), **logical (row-based) log** (decoupled, good for CDC), **trigger-based** (flexible, more overhead)." },
      { q: "What is 'eventual consistency' and replication lag?", a: "With async followers, reads may return stale data. If writes stop, followers eventually catch up. The delay is replication lag — normally fractions of a second, but can be minutes under load or failures." },
      { q: "Read-after-write (read-your-writes) consistency — how to implement?", a: "Guarantee that a user sees their own updates. E.g. read things the user may have modified from the leader; read from leader for 1 min after an update; track the timestamp of the user's last write and only use replicas that are caught up to it." },
      { q: "Monotonic reads?", a: "Guarantee a user won't see time go backward (newer data, then older data from a more-lagged replica). Implement by always routing a user's reads to the same replica (e.g. by hash of user ID)." },
      { q: "Consistent prefix reads?", a: "If writes happen in a certain order, anyone reading them sees them in that order. Problem mainly in partitioned DBs, where partitions operate independently and no global write order exists." },
      { q: "Use cases for multi-leader replication?", a: "Multi-datacenter operation, clients with offline operation (each device is a 'leader', e.g. calendar apps), and collaborative editing." },
      { q: "Ways to resolve write conflicts in multi-leader?", a: "Avoid them (route all writes for a record to one leader), last write wins (data loss), higher replica ID wins, merge values, record the conflict and resolve in app code (on write or on read). Also **CRDTs**, mergeable persistent data structures, operational transformation." },
      { q: "Multi-leader replication topologies?", a: "**Circular**, **star**, and **all-to-all**. Circular and star have single points of failure; all-to-all can deliver messages out of order (causality issues), fixed with version vectors." },
      { q: "In a leaderless (Dynamo-style) system, how does a stale node catch up?", a: "**Read repair** (client writes back the newer value when it sees a stale response) and an **anti-entropy** background process comparing replicas." },
      { q: "What is the quorum condition?", a: "With n replicas, w write acks and r read responses: if **w + r > n**, at least one node read must have the latest value. Common choice: n odd, w = r = (n+1)/2." },
      { q: "Sloppy quorum and hinted handoff?", a: "During a network interruption, writes are accepted by reachable nodes that aren't among the n 'home' nodes. When the network recovers, those writes are **handed off** to the right nodes. Increases write availability, but w + r > n no longer guarantees reading the latest value." },
      { q: "What does the 'happens-before' relationship mean for concurrent writes?", a: "B depends on A if B knows about A. If neither knows about the other, they are **concurrent** — regardless of wall-clock time. Concurrent writes need conflict resolution." },
      { q: "What is a version vector?", a: "A collection of version numbers, one per replica (per key), passed between clients and replicas so the DB can tell overwrites from concurrent writes and keep siblings that must be merged." }
    ]
  },
  {
    id: 6, part: "II. Distributed Data",
    title: "Partitioning",
    cards: [
      { q: "Main reason for partitioning (sharding)?", a: "**Scalability** — spreading data and query load across many nodes, since a single machine can't hold or serve it all." },
      { q: "What is a hot spot / skew?", a: "Skew: some partitions have more data or queries than others. A hot spot is a partition with disproportionately high load — which defeats the purpose of partitioning." },
      { q: "Partitioning by key range: pros and cons?", a: "Pro: efficient range scans (keys sorted). Con: certain access patterns create hot spots — e.g. timestamp keys send all today's writes to one partition." },
      { q: "Partitioning by hash of key: pros and cons?", a: "Pro: distributes keys evenly, reducing hot spots. Con: lose efficient range queries — adjacent keys are scattered across partitions." },
      { q: "How does Cassandra compromise between range and hash partitioning?", a: "**Compound primary key**: only the first part is hashed to choose the partition; remaining columns form a concatenated sorted index within it — allowing range scans for a fixed first key (e.g. (user_id, timestamp))." },
      { q: "How can you mitigate a single extremely hot key (celebrity)?", a: "Append a random number (e.g. 2 digits) to the key to spread writes across 100 keys — but reads must then fetch all of them and combine, and you must track which keys are split." },
      { q: "Document-partitioned (local) secondary indexes?", a: "Each partition indexes only its own documents. Writes touch one partition, but reads on the secondary index need **scatter/gather** across all partitions (tail-latency prone)." },
      { q: "Term-partitioned (global) secondary indexes?", a: "The index itself is partitioned by the indexed term, separately from the data. Reads hit one index partition, but writes may update several partitions, and index updates are often asynchronous." },
      { q: "Why is `hash mod N` a bad way to assign partitions to nodes?", a: "When N changes, most keys must move to a different node, making rebalancing very expensive." },
      { q: "Rebalancing strategy: fixed number of partitions?", a: "Create many more partitions than nodes (e.g. 1,000 for 10 nodes). New nodes steal whole partitions from existing ones; only partition-to-node assignment changes. Used by Riak, Elasticsearch, Couchbase, Voldemort." },
      { q: "Rebalancing strategy: dynamic partitioning?", a: "Partitions split when they exceed a size and merge when they shrink (like a B-tree). Adapts to data volume; used by HBase and RethinkDB. Pre-splitting helps avoid an empty DB starting on one node." },
      { q: "Rebalancing proportionally to nodes?", a: "Fixed number of partitions **per node** (Cassandra, Ketama). A new node randomly splits existing partitions and takes half of each." },
      { q: "Why might you avoid fully automatic rebalancing?", a: "Rebalancing is expensive; combined with automatic failure detection it can cascade (an overloaded node looks dead, triggering rebalancing that adds more load)." },
      { q: "Three approaches to request routing?", a: "Client contacts any node which forwards if needed; a **routing tier** that's partition-aware; or the client itself is partition-aware. Often a coordination service like **ZooKeeper** tracks the mapping (or a gossip protocol, as in Cassandra/Riak)." }
    ]
  },
  {
    id: 7, part: "II. Distributed Data",
    title: "Transactions",
    cards: [
      { q: "What does ACID stand for?", a: "**Atomicity, Consistency, Isolation, Durability.**" },
      { q: "What does 'atomicity' really mean in ACID?", a: "**Abortability**: if a transaction can't complete, all of its writes are discarded, so it can safely be retried. (Not about concurrency.)" },
      { q: "Why is the C in ACID the odd one out?", a: "Consistency (invariants about data, like balanced accounts) is a property of the **application**, not the database. The DB provides A, I, D; the app relies on them to stay consistent." },
      { q: "What does isolation mean in the textbook sense?", a: "**Serializability**: concurrently executing transactions produce the same result as if they ran one after another. In practice many DBs offer weaker isolation for performance." },
      { q: "Dirty read vs. dirty write?", a: "**Dirty read:** seeing another transaction's uncommitted writes. **Dirty write:** overwriting another transaction's uncommitted write. Read committed prevents both." },
      { q: "How is read committed usually implemented?", a: "Row-level locks for writes (prevent dirty writes); for reads, the DB remembers the old committed value and the new value, returning the old value until commit (no read locks)." },
      { q: "What is read skew (nonrepeatable read)?", a: "A transaction sees different parts of the DB at different points in time — e.g. a balance transfer appears half-done. Problematic for backups and long analytic queries." },
      { q: "What is snapshot isolation and how is it implemented?", a: "Each transaction reads from a consistent snapshot of the DB as of its start. Implemented with **MVCC** — keeping multiple committed versions of each object, tagged with transaction IDs. Readers never block writers and vice versa." },
      { q: "What is a lost update and how can you prevent it?", a: "Two concurrent read-modify-write cycles where one overwrites the other's change. Prevention: atomic write operations (`UPDATE ... SET x = x + 1`), explicit locking (`SELECT ... FOR UPDATE`), automatic detection, compare-and-set." },
      { q: "What is write skew?", a: "Two transactions read the same objects, then each updates *different* objects based on what they read, together violating an invariant — e.g. two doctors both going off call. Generalizes lost update; snapshot isolation doesn't prevent it." },
      { q: "What is a phantom?", a: "A write in one transaction changes the result of a search query in another (e.g. a row that wasn't there now matches). Hard to lock because there's no existing row to lock. Fix: **materializing conflicts** or predicate/index-range locks." },
      { q: "Three techniques to implement serializability?", a: "**Actual serial execution** (single thread, stored procedures, in-memory data), **two-phase locking (2PL)**, and **serializable snapshot isolation (SSI)**." },
      { q: "How does two-phase locking work?", a: "Readers take shared locks, writers take exclusive locks, and locks are held until commit/abort. Writers block readers and readers block writers. Deadlocks are detected and one transaction aborted. Poor performance and unstable latency." },
      { q: "What are index-range (next-key) locks?", a: "An approximation of predicate locks: lock a range of an index covering the query's search condition. Prevents phantoms with less overhead than full predicate locks." },
      { q: "How does SSI differ from 2PL?", a: "SSI is **optimistic**: transactions proceed without blocking; at commit the DB checks if any premise it read became outdated (stale MVCC reads or writes affecting prior reads) and aborts if so. Performs well when contention is low." }
    ]
  },
  {
    id: 8, part: "II. Distributed Data",
    title: "The Trouble with Distributed Systems",
    cards: [
      { q: "What is a partial failure?", a: "Some parts of the system are broken in unpredictable ways while others work fine. It's **nondeterministic** — and the defining difficulty of distributed systems vs. a single computer." },
      { q: "If you send a request and get no response, what could have happened?", a: "Request lost; request queued; remote node crashed or paused; request processed but response lost or delayed. You **can't tell which** — the usual answer is a timeout." },
      { q: "Trade-off in choosing a timeout?", a: "Too long: long waits before declaring a node dead. Too short: false positives — declaring a node dead that's just slow, which can cause duplicate actions and cascading failures." },
      { q: "Why are network delays so variable?", a: "Queueing: at network switches, in the OS when CPUs are busy, in VM hypervisors, and from TCP flow control and retransmission. Shared, **asynchronous packet networks** optimize for bursty traffic, not bounded delay." },
      { q: "Circuit-switched vs. packet-switched networks?", a: "**Circuit (telephone):** fixed bandwidth reserved per call, bounded delay. **Packet (Ethernet/IP):** opportunistically uses available bandwidth — better utilization for bursty data, but **unbounded delays**." },
      { q: "Time-of-day clock vs. monotonic clock?", a: "**Time-of-day:** wall-clock time (NTP-synced), can jump backward — unsuitable for measuring durations. **Monotonic:** always moves forward; good for elapsed time, but meaningless across machines." },
      { q: "Why is last-write-wins with timestamps dangerous?", a: "Clock skew means a node with a fast clock can make its writes 'win' over later ones from a slower node — **silently dropping data**. Timestamps can't distinguish sequential from concurrent writes." },
      { q: "How does Google Spanner use clock uncertainty?", a: "**TrueTime** returns a confidence interval [earliest, latest]. Spanner waits out the interval before committing, guaranteeing non-overlapping intervals for causally ordered transactions. Uses GPS/atomic clocks to keep it small (~7ms)." },
      { q: "What are process pauses and why do they matter?", a: "A thread can be paused for a long time without knowing it — GC stop-the-world, VM suspension, OS context switches, disk I/O, swapping, SIGSTOP. A node assuming it still holds a lease can act after it expired." },
      { q: "Why can't a node trust its own judgment about being the leader?", a: "It might have been declared dead by the others (e.g. during a long pause). Decisions require a **quorum** — a majority vote of nodes." },
      { q: "What is a fencing token?", a: "A number that increases every time a lock/lease is granted. Clients include it with each write; the storage service rejects writes with an older token than one already seen — stopping a paused ex-leader from corrupting data." },
      { q: "What is a Byzantine fault?", a: "A node behaving arbitrarily, possibly maliciously — sending corrupted or false messages. Most data systems assume nodes are honest (crash-stop or crash-recovery); Byzantine tolerance matters in aerospace and blockchains." },
      { q: "Three system models for timing?", a: "**Synchronous** (bounded delays — unrealistic), **partially synchronous** (usually bounded, occasionally not — the realistic one), **asynchronous** (no timing assumptions at all)." },
      { q: "Safety vs. liveness properties?", a: "**Safety:** nothing bad happens (if violated, there's a point in time you can name — e.g. uniqueness). **Liveness:** something good eventually happens (e.g. availability). Safety must always hold; liveness may have caveats." }
    ]
  },
  {
    id: 9, part: "II. Distributed Data",
    title: "Consistency and Consensus",
    cards: [
      { q: "What is linearizability?", a: "Make the system appear as if there's **only one copy** of the data and every operation is atomic. Once any read returns a new value, all subsequent reads (by anyone) must return it too — a **recency guarantee**." },
      { q: "Linearizability vs. serializability?", a: "**Serializability:** isolation property of transactions (multiple objects) — some serial order. **Linearizability:** recency guarantee on reads/writes of a single object. Both together = strict serializability." },
      { q: "When is linearizability actually needed?", a: "Locking and leader election, uniqueness constraints (usernames, no double-booking), and cross-channel timing dependencies (e.g. a message queue notification arriving before the stored file is visible)." },
      { q: "Which replication methods can be linearizable?", a: "Single-leader: potentially. Consensus algorithms: yes. Multi-leader: no. Leaderless with quorums: probably not (and LWW/sloppy quorums definitely not)." },
      { q: "What does CAP really say, and why is it unhelpful?", a: "When a network **partition** occurs, choose either linearizability (consistency) or availability. It's narrow: one consistency model, one kind of fault, ignores latency. 'Pick 2 of 3' is misleading since partitions aren't optional." },
      { q: "Why do many systems drop linearizability?", a: "**Performance**, more than fault tolerance. Linearizable reads/writes are slow because response time is proportional to network delay uncertainty — even without faults." },
      { q: "Causal consistency vs. linearizability?", a: "Linearizability implies a **total order**; causality is a **partial order** (concurrent operations are incomparable). Causal consistency is the strongest model that doesn't slow down due to network delays and stays available under partitions." },
      { q: "What is a Lamport timestamp?", a: "A pair **(counter, node ID)**. Each node tracks the max counter it's seen and includes it on every request. Gives a total order consistent with causality — but you can't tell at the time whether you can safely decide (e.g. claim a username)." },
      { q: "What is total order broadcast?", a: "A protocol guaranteeing **reliable delivery** (if a message reaches one node, it reaches all) and **totally ordered delivery** (same order everywhere). Equivalent to consensus; underpins state machine replication." },
      { q: "How can you build linearizable storage from total order broadcast?", a: "E.g. for a username claim: append a message tentatively claiming it, read the log, and if the first claim for that name delivered is yours, commit; otherwise abort." },
      { q: "How does two-phase commit (2PC) work?", a: "Coordinator sends **prepare** to all participants; each replies yes/no and a 'yes' is a promise it can commit. If all say yes, coordinator writes the decision to its log (**commit point**) and sends commit; otherwise abort." },
      { q: "What is the main weakness of 2PC?", a: "If the coordinator crashes after participants voted yes, they are **in doubt** — stuck holding locks until the coordinator recovers. It's a blocking atomic commit protocol." },
      { q: "Four properties of consensus?", a: "**Uniform agreement** (no two nodes decide differently), **integrity** (decide at most once), **validity** (decided value was proposed), **termination** (every non-crashed node eventually decides)." },
      { q: "How do consensus algorithms (Raft, Paxos, Zab) avoid split brain?", a: "Each leader is unique within an **epoch number**. Before deciding, a leader must collect votes from a **quorum**; the quorums for electing a leader and for voting on a proposal must overlap, so a newer epoch is always detected." },
      { q: "What do ZooKeeper / etcd provide to applications?", a: "Linearizable atomic operations, total ordering (zxid as fencing token), failure detection via sessions/ephemeral nodes, change notifications. Used for leader election, partition assignment, service discovery." }
    ]
  },
  {
    id: 10, part: "III. Derived Data",
    title: "Batch Processing",
    cards: [
      { q: "Systems of record vs. derived data?", a: "**System of record:** the source of truth; each fact represented exactly once. **Derived data:** transformed/processed copies (caches, indexes, materialized views) that can be recreated from the source." },
      { q: "Three types of systems compared at the chapter start?", a: "**Services** (online; response time matters), **batch processing** (offline; throughput matters), **stream processing** (near-real-time; between the two)." },
      { q: "Key lessons from the Unix philosophy?", a: "Make each program do one thing well; expect output to become another program's input; use a **uniform interface** (files/text streams); separate logic from wiring (stdin/stdout); make experimentation easy." },
      { q: "How is a MapReduce job structured?", a: "Read input files split into records → **mapper** extracts key-value pairs → framework **sorts/shuffles** by key → **reducer** processes all values for each key → output written to the distributed filesystem (HDFS)." },
      { q: "What is 'putting the computation near the data'?", a: "The scheduler tries to run each mapper on a machine that already stores a replica of its input file, avoiding copying the input over the network." },
      { q: "What is a sort-merge join (reduce-side join)?", a: "Mappers emit records from both datasets keyed by the join key; the framework sorts so all records with the same key arrive at the same reducer (secondary sort can order one side first), which then joins them." },
      { q: "How do you handle skew in reduce-side joins?", a: "Hot keys (linchpin objects) overwhelm a single reducer. Fixes: **skewed join** (Pig) / **sharded join** (Crunch) send hot-key records to several reducers; Hive uses a map-side join for hot keys." },
      { q: "Name the map-side join types.", a: "**Broadcast hash join** (small input loaded into memory in each mapper), **partitioned hash join** (both inputs partitioned the same way), **map-side merge join** (both inputs partitioned *and* sorted the same way)." },
      { q: "Why should batch jobs write output to new files rather than to a database directly?", a: "Writing per-record to a DB is slow, can overwhelm it, and breaks all-or-nothing semantics. Writing immutable files makes outputs easy to roll back, retry, and makes jobs idempotent — enabling **human fault tolerance**." },
      { q: "Hadoop vs. MPP databases — philosophical difference?", a: "MPP databases require careful upfront data modeling. Hadoop encouraged dumping raw data in first and figuring out how to process it later (the **sushi principle**: raw data is better) — more flexibility in processing models." },
      { q: "Downsides of MapReduce's full materialization of intermediate state?", a: "Each job waits for all preceding tasks to finish, mappers are often redundant, and intermediate files are replicated across nodes — wasteful for temporary data." },
      { q: "How do dataflow engines (Spark, Tez, Flink) improve on MapReduce?", a: "Treat the whole workflow as one job of **operators**, avoid unnecessary sorting and map stages, keep intermediate state in memory or local disk, pipeline execution, and let the scheduler optimize locality." },
      { q: "How do dataflow engines recover from faults without materializing everything?", a: "Recompute lost intermediate data from upstream inputs (Spark tracks lineage via RDDs; Flink checkpoints operator state). Requires operators to be **deterministic** or downstream work must be killed too." },
      { q: "What is the Pregel / bulk synchronous parallel model?", a: "For iterative graph processing: a vertex 'remembers' state and sends messages to other vertices along edges; in each iteration a function runs for each vertex with its incoming messages. Fault tolerance via periodic checkpointing." }
    ]
  },
  {
    id: 11, part: "III. Derived Data",
    title: "Stream Processing",
    cards: [
      { q: "What is an event in stream processing?", a: "A small, self-contained, immutable object describing something that happened at a point in time, usually with a timestamp. Generated by a **producer**, processed by possibly many **consumers**, grouped into a **topic**." },
      { q: "Two key questions to classify messaging systems?", a: "1) What happens if producers send faster than consumers can process? (drop, buffer, or **backpressure**) 2) What happens if nodes crash — are messages lost?" },
      { q: "Load balancing vs. fan-out in consumers?", a: "**Load balancing:** each message delivered to one of the consumers (parallelize work). **Fan-out:** each message delivered to all consumers. Can be combined (Kafka consumer groups)." },
      { q: "Why can load balancing + redelivery cause reordering in AMQP/JMS brokers?", a: "If a consumer crashes before acking, the message is redelivered to another consumer, which may already have processed later messages — so ordering is lost." },
      { q: "What is a log-based message broker (Kafka, Kinesis)?", a: "Producers append messages to a partitioned, append-only log on disk; consumers read sequentially and track their **offset**. Messages aren't deleted on consumption, so they can be replayed." },
      { q: "Log-based vs. traditional (AMQP/JMS) brokers — when to use which?", a: "**Log-based:** high throughput, order matters, each message fast to process, replay wanted. **Traditional:** messages expensive to process, want per-message parallelism, ordering not important." },
      { q: "What happens if a log consumer falls far behind?", a: "The log is a bounded buffer (circular, disk-sized — often days or weeks). If the consumer falls behind past retention, it misses messages. Only that consumer is affected; you can monitor the lag." },
      { q: "What is change data capture (CDC)?", a: "Observing all changes written to a database and extracting them as a stream that can be replicated to other systems (search indexes, caches, warehouses), keeping derived systems in sync in write order." },
      { q: "What is log compaction for?", a: "Keeping only the most recent value for each key (deleting older ones and tombstoned keys), so the log size depends on current DB contents, not history — letting new consumers rebuild a full copy from offset 0." },
      { q: "Event sourcing vs. CDC?", a: "**CDC:** low-level, DB is mutable, log extracted from it. **Event sourcing:** app logic explicitly built on immutable, application-level **events** that express user intent. Current state is derived from the event log." },
      { q: "Commands vs. events?", a: "A **command** is a request that may still fail validation. Once validated and accepted, it becomes an **event** — durable and factual, even if later cancelled by another event." },
      { q: "What is CQRS?", a: "**Command Query Responsibility Segregation**: separate the form in which data is written (event log) from the form it's read (read-optimized views derived from the log)." },
      { q: "Event time vs. processing time — why does it matter?", a: "Events can be delayed (network, queues, offline devices). Windowing by processing time gives misleading results, e.g. a backlog after a restart looks like a spike. Also: you never know if all events for a window have arrived (**stragglers**)." },
      { q: "Name the four window types.", a: "**Tumbling** (fixed, non-overlapping), **hopping** (fixed length, overlapping), **sliding** (all events within some interval of each other), **session** (grouped by user activity, ends after inactivity gap)." },
      { q: "Three types of stream joins?", a: "**Stream-stream** (window join, e.g. search → click), **stream-table** (enrich events with a DB changelog, e.g. user profile), **table-table** (both are changelogs; maintain a materialized view of the join)." },
      { q: "How do stream processors achieve exactly-once (effectively-once) semantics?", a: "**Microbatching** (Spark Streaming), **checkpointing** (Flink), **atomic commit** of output + offsets (Kafka transactions), and **idempotent** writes (e.g. storing the offset with each write)." }
    ]
  },
  {
    id: 12, part: "III. Derived Data",
    title: "The Future of Data Systems",
    cards: [
      { q: "What is data integration, and why is it hard?", a: "Combining specialized tools (DB, search index, cache, warehouse) so each handles what it's good at. Hard because the same data must be kept consistent across many representations." },
      { q: "Why derive data via a single ordered log instead of dual writes?", a: "Dual writes from the application risk race conditions and partial failures leaving systems inconsistent. A totally ordered log (CDC / event sourcing) gives every derived system the same writes in the same order." },
      { q: "What is the Lambda architecture, and its problem?", a: "Run a batch system (accurate, slow) and a stream system (fast, approximate) in parallel on the same immutable input. Problem: maintaining the same logic in two frameworks, merging outputs, and expensive reprocessing." },
      { q: "What does 'unbundling the database' mean?", a: "Treating the dataflow across an organization like one big database: features like secondary indexes, materialized views and replication are implemented as separate systems connected via event logs rather than inside one product." },
      { q: "Federated databases vs. unbundled databases?", a: "**Federated (unifying reads):** one query interface over many storage engines. **Unbundled (unifying writes):** reliably propagating writes to all systems via async event logs, preferred for loose coupling." },
      { q: "What is the 'database inside-out' idea?", a: "Application code as stream operators deriving state from event logs; the DB's internal machinery (change logs, indexes, materialized views) exposed and composed across systems." },
      { q: "Why push state changes to clients instead of request/response polling?", a: "Extending the write path all the way to the end-user device keeps client-side caches/views up to date (like a materialized view), offline-friendly, and avoids stale UIs." },
      { q: "What is the end-to-end argument applied to data systems?", a: "Correctness guarantees (e.g. duplicate suppression) must ultimately be implemented by the endpoints of the communication — like passing a **unique request ID** from client to DB — lower-level mechanisms (TCP, DB transactions) can't fully cover it." },
      { q: "How can a uniqueness constraint be enforced in a log-based system without distributed transactions?", a: "Partition the log by the value to be unique; a single-threaded processor reads requests sequentially and decides deterministically which one wins, emitting success/reject messages." },
      { q: "Timeliness vs. integrity?", a: "**Timeliness:** users see up-to-date state (violations are temporary — just wait). **Integrity:** no corruption or contradictory data (violations are permanent). Integrity matters much more; event-based dataflow can keep integrity without timeliness." },
      { q: "What are coordination-avoiding data systems?", a: "Systems that maintain integrity via deterministic derivation and idempotent operations, tolerating loosely interpreted constraints (apologize and compensate), so they work across datacenters with async replication." },
      { q: "Why audit data systems ('trust, but verify')?", a: "Hardware and software bugs do corrupt data. Systems should periodically check integrity end-to-end — event logs make this easier, since derived state can be recomputed and compared." },
      { q: "Ethical concerns raised in the final section?", a: "Predictive analytics reinforcing bias and discrimination, lack of accountability for algorithmic decisions, feedback loops, and pervasive tracking that amounts to **surveillance**. Data is a liability as much as an asset; respect consent and privacy." }
    ]
  }
];
