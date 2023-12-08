/*!50530 SET @@SESSION.PSEUDO_SLAVE_MODE=1*/;
/*!50003 SET @OLD_COMPLETION_TYPE=@@COMPLETION_TYPE,COMPLETION_TYPE=0*/;
DELIMITER /*!*/;
# at 4
#231207 16:29:06 server id 1  end_log_pos 125 CRC32 0x9371565a 	Start: binlog v 4, server v 8.0.23 created 231207 16:29:06
# Warning: this binlog is either in use or was not closed properly.
BINLOG '
MkdyZQ8BAAAAeQAAAH0AAAABAAQAOC4wLjIzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAEwANAAgAAAAABAAEAAAAYQAEGggAAAAICAgCAAAACgoKKioAEjQA
CigBWlZxkw==
'/*!*/;
# at 125
#231207 16:29:06 server id 1  end_log_pos 156 CRC32 0x58784cdd 	Previous-GTIDs
# [empty]
# at 156
#231207 16:32:20 server id 1  end_log_pos 235 CRC32 0xad90972f 	Anonymous_GTID	last_committed=0	sequence_number=1	rbr_only=yes	original_committed_timestamp=1701988341103714	immediate_commit_timestamp=1701988341103714	transaction_length=711
/*!50718 SET TRANSACTION ISOLATION LEVEL READ COMMITTED*//*!*/;
# original_commit_timestamp=1701988341103714 (2023-12-07 16:32:21.103714 Hora estßndar, AmÚrica Central)
# immediate_commit_timestamp=1701988341103714 (2023-12-07 16:32:21.103714 Hora estßndar, AmÚrica Central)
/*!80001 SET @@session.original_commit_timestamp=1701988341103714*//*!*/;
/*!80014 SET @@session.original_server_version=80023*//*!*/;
/*!80014 SET @@session.immediate_server_version=80023*//*!*/;
SET @@SESSION.GTID_NEXT= 'ANONYMOUS'/*!*/;
# at 235
#231207 16:32:20 server id 1  end_log_pos 321 CRC32 0xd8837a2a 	Query	thread_id=204	exec_time=0	error_code=0
SET TIMESTAMP=1701988340/*!*/;
SET @@session.pseudo_thread_id=204/*!*/;
SET @@session.foreign_key_checks=1, @@session.sql_auto_is_null=0, @@session.unique_checks=1, @@session.autocommit=1/*!*/;
SET @@session.sql_mode=1075838976/*!*/;
SET @@session.auto_increment_increment=1, @@session.auto_increment_offset=1/*!*/;
/*!\C utf8mb4 *//*!*/;
SET @@session.character_set_client=255,@@session.collation_connection=255,@@session.collation_server=255/*!*/;
SET @@session.lc_time_names=0/*!*/;
SET @@session.collation_database=DEFAULT/*!*/;
/*!80011 SET @@session.default_collation_for_utf8mb4=255*//*!*/;
BEGIN
/*!*/;
# at 321
#231207 16:32:20 server id 1  end_log_pos 394 CRC32 0xe894963a 	Table_map: `bd2_practica1`.`habitacion` mapped to number 173
# at 394
#231207 16:32:20 server id 1  end_log_pos 836 CRC32 0xd6d3984c 	Write_rows: table id 173 flags: STMT_END_F

BINLOG '
9EdyZRMBAAAASQAAAIoBAAAAAK0AAAAAAAMADWJkMl9wcmFjdGljYTEACmhhYml0YWNpb24AAgMP
AsgAAgEBAAID/P8AOpaU6A==
9EdyZR4BAAAAugEAAEQDAAAAAK0AAAAAAAEAAgAC/wABAAAAE1NhbGEgZGUgZXhhbWVuZXMgMQ0A
AgAAABNTYWxhIGRlIGV4YW1lbmVzIDINAAMAAAATU2FsYSBkZSBleGFtZW5lcyAzDQAEAAAAE1Nh
bGEgZGUgZXhhbWVuZXMgNA0ABQAAABNTYWxhIGRlIGltYWdlbmVzIDENAAYAAAAZU2FsYSBkZSBw
cm9jZWRpbWllbnRvcyAxDQAHAAAAGVNhbGEgZGUgcHJvY2VkaW1pZW50b3MgMg0ACAAAABlTYWxh
IGRlIHByb2NlZGltaWVudG9zIDMNAAkAAAAZU2FsYSBkZSBwcm9jZWRpbWllbnRvcyA0DQAKAAAA
ClJlY2VwY2lvbg0ACwAAAAxMYWJvcmF0b3Jpbw0ADAAAABlFc3RhY2nDs24gZGUgcmV2aXNpw7Nu
IDENAA0AAAAZRXN0YWNpw7NuIGRlIHJldmlzacOzbiAyDQAOAAAAGUVzdGFjacOzbiBkZSByZXZp
c2nDs24gMw0ADwAAABlFc3RhY2nDs24gZGUgcmV2aXNpw7NuIDQNTJjT1g==
'/*!*/;
# at 836
#231207 16:32:20 server id 1  end_log_pos 867 CRC32 0x5061dfeb 	Xid = 65716
COMMIT/*!*/;
SET @@SESSION.GTID_NEXT= 'AUTOMATIC' /* added by mysqlbinlog */ /*!*/;
DELIMITER ;
# End of log file
/*!50003 SET COMPLETION_TYPE=@OLD_COMPLETION_TYPE*/;
/*!50530 SET @@SESSION.PSEUDO_SLAVE_MODE=0*/;
